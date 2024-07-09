import { config } from './utils/Config';
import build from "./App";
import {
  VCLCryptoServicesDescriptor,
  VCLInitializationDescriptor,
  VCLProvider,
  VCLDidJwkDescriptor,
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import { CurrentEnvironment, XVnfProtocolVersion } from "./GlobalConfig";
import { JwtSignServiceImpl, JwtVerifyServiceImpl, KeyServiceImpl } from "./crypto-services";
import cors from '@fastify/cors';

const devLogger = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
}

const app: any = build({
  logger: config.nodeEnv === 'development' ? devLogger : true,
  pluginTimeout: 0,
});

const initialize = (app) => {
  const vclSdk = VCLProvider.getInstance();

  const initializationDescriptor = new VCLInitializationDescriptor(
      CurrentEnvironment,
      XVnfProtocolVersion,
      new VCLCryptoServicesDescriptor(
          new KeyServiceImpl(),
          new JwtSignServiceImpl(),
          new JwtVerifyServiceImpl()
      )
  );

  vclSdk.initialize(initializationDescriptor).then(() => {
    console.log('VCL SDK initialized successfully');

    vclSdk.generateDidJwk(new VCLDidJwkDescriptor()).then((didJwk) => {
      console.log(`DID JWK generated successfully: ${JSON.stringify(didJwk)}`);
      app.decorate('vclSdk', vclSdk);
      app.decorate('didJwk', didJwk);

      const addHooks = async (req, reply) => {
        req.vclSdk = app.vclSdk;
        req.didJwk = app.didJwk;
        reply.vclSdk = app.vclSdk;
        reply.didJwk = app.didJwk;
      };
      app.addHook('preHandler', addHooks);
      app.addHook('preValidation', addHooks);
      // app.addHook('onSend', (request, reply, payload, done) => {
      //   reply.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      //   reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      //   reply.header('Access-Control-Allow-Headers', 'Content-Type');
      //   done();
      // });
      app.register(cors);

      app.listen({ port: 5000, host: "0.0.0.0" }, (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`Server listening at ${address}`);
      });
    }).catch((e) => {
      console.error('Failed to generate DID JWK', e);
      throw e;
    });
  }).catch((e) => {
    console.error('Failed to initialize VCL SDK', e);
    throw e;
  });
}

initialize(app);
