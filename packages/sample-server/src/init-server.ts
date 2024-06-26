/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import vclSdkPlugin from './plugins/vcl-sdk-plugin';

export const initServer = (server) => {
    server
        .decorate(
            'globalCareerWalletFetch',
            // eslint-disable-next-line no-console
            server.baseCareerWalletFetch({ log: console })
        )
        .decorateRequest('careerWalletFetch', null)
        .addHook('preValidation', async (req) => {
            req.careerWalletFetch = server.baseCareerWalletFetch(req);
        })
        .decorateRequest('linkedInFetch', null)
        .addHook('preValidation', async (req) => {
            req.linkedInFetch = server.baseLinkedInFetch(req);
        })
        .register(vclSdkPlugin)
        .addHook('preValidation', async (req) => {
            req.vclSdk = server.vclSdk;
        });

    return server;
};
