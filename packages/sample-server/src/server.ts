import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { config } from './utils/config';
import build from "./app";

const devLogger = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
}

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = build({
  logger: config.nodeEnv === 'development' ? devLogger : true,
});

app.listen({port: 8080, host: "0.0.0.0"}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
