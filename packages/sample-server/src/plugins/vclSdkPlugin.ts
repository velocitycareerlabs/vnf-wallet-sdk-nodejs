/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    FastifyPluginAsync,
    FastifyPluginCallback,
} from "fastify";
import {
    VCLProvider,
    VCLInitializationDescriptor,
    VCLCryptoServicesDescriptor,
} from '@velocitycareerlabs/vnf-nodejs-wallet-sdk/src';
import {
    KeyServiceImpl,
    JwtSignServiceImpl,
    JwtVerifyServiceImpl,
} from '../crypto-services';
import { CurrentEnvironment, XVnfProtocolVersion } from "../global-config";

const vclSdkPlugin: FastifyPluginAsync | FastifyPluginCallback = async (
    fastify,
) => {
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
        await vclSdk.initialize(initializationDescriptor);
    } catch (e) {
        console.error('Failed to initialize VCL SDK', e);
        throw e;
    }
    fastify.decorate('vclSdk', vclSdk)
    fastify.addHook('preHandler', function (req, reply, done) {
        req.vclSdk = vclSdk
        reply.vclSdk = vclSdk
        done()
    })
};

export default vclSdkPlugin;
