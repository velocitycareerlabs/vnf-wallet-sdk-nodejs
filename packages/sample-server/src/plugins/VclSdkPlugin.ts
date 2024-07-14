/**
 * Created by Michael Avoyan on 14/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import fastifyPlugin from "fastify-plugin";
import {
    VCLCryptoServicesDescriptor, VCLDidJwkDescriptor,
    VCLInitializationDescriptor,
    VCLProvider
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import { CurrentEnvironment, XVnfProtocolVersion } from "../GlobalConfig";
import { JwtSignServiceImpl, JwtVerifyServiceImpl, KeyServiceImpl } from "../crypto-services";

const vclSdkPlugin = async (fastify) => {
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

    try {
        await vclSdk.initialize(initializationDescriptor)
        console.log('VCL SDK initialized successfully');
        try {
            const didJwk = await vclSdk.generateDidJwk(new VCLDidJwkDescriptor())
            console.log(`DID JWK generated successfully: ${JSON.stringify(didJwk)}`);
            fastify.decorate('vclSdk', vclSdk);
            fastify.decorate('didJwk', didJwk);
            const addHooks = async (req, reply) => {
                req.vclSdk = vclSdk;
                req.didJwk = didJwk;
                reply.vclSdk = vclSdk;
                reply.didJwk = didJwk;
            };
            fastify.addHook('preHandler', addHooks);
        } catch (e) {
            console.error('Failed to generate DID JWK', e);
            throw e;
        }
    } catch (e) {
        console.error('Failed to initialize VCL SDK', e);
        throw e;
    }
};

export default fastifyPlugin(vclSdkPlugin, {
    fastify: '>=2.0.0',
    name: 'vclSdkPlugin',
});