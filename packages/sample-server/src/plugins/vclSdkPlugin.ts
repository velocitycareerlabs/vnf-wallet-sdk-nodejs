/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

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
import { CurrentEnvironment, XVnfProtocolVersion } from '../global-config';

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
        await vclSdk.initialize(initializationDescriptor);
    } catch (e) {
        console.error('Failed to initialize VCL SDK', e);
        throw e;
    }

    fastify.decorate('vclSdk', vclSdk);

    const setVclSdk = async (req, reply) => {
        req.vclSdk = fastify.vclSdk;
        reply.vclSdk = fastify.vclSdk;
    };
    fastify.addHook('preHandler', setVclSdk);
    fastify.addHook('preValidation', setVclSdk);
};

export default vclSdkPlugin;
