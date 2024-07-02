/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { VCLDeepLink, VCLPresentationRequestDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function getPresentationRequest(req, reply) {
    const deepLink = new VCLDeepLink(req.body.value)
    try {
        const presentationRequestDescriptor = new VCLPresentationRequestDescriptor(
            deepLink,
            null,
            req.didJwk,
            null
        )
        const presentationRequest = await req.vclSdk.getPresentationRequest(presentationRequestDescriptor);
        reply.send(presentationRequest);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: "500",
            error: e,
            message: "Failed to get presentation request",
        });
    }
}