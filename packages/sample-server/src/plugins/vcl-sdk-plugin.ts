/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import fastifyPlugin from 'fastify-plugin';
import {
    FastifyPluginAsync,
    FastifyPluginCallback,
} from "fastify";
import {
    VCLProvider,
    VCLInitializationDescriptor,
    VCLCryptoServicesDescriptor,
    VCLXVnfProtocolVersion,
    VCLEnvironment,
} from '@velocitycareerlabs/vnf-nodejs-wallet-sdk/src';
import {
    KeyServiceImpl,
    JwtSignServiceImpl,
    JwtVerifyServiceImpl,
} from '../crypto-services';

const vclSdkPlugin: FastifyPluginAsync | FastifyPluginCallback = async (
    fastify,
) => {
    const { log, sendError, config } = fastify;

    try {
        const vclSdk = VCLProvider.getInstance();

        const initializationDescriptor = new VCLInitializationDescriptor(
            config.vclSdkEnvironment || VCLEnvironment.Prod,
            config.vclSdkProtocolVersion ||
            VCLXVnfProtocolVersion.XVnfProtocolVersion2,
            new VCLCryptoServicesDescriptor(
                new KeyServiceImpl(),
                new JwtSignServiceImpl(),
                new JwtVerifyServiceImpl()
            )
        );
        await vclSdk.initialize(initializationDescriptor);

        fastify
            .decorate('vclSdk', vclSdk)
            .decorateRequest('vclSdk', null)
            .addHook('preValidation', async (req) => {
                req.vclSdk = fastify.vclSdk;
            });

    } catch (error) {
        log.error(error);
        sendError(error);

        throw error;
    }
};

export = {
    vclSdkPlugin: fastifyPlugin(vclSdkPlugin, {
        fastify: '>=4.0.0',
        name: 'vcl-sdk-plugin',
    }),
};
