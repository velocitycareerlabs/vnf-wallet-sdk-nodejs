/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { VCLPresentationRequestDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import { deepLinkFromString } from "../utils/Converter";

export async function getPresentationRequest(req, reply) {
    try {
        const deepLink = deepLinkFromString(req.body.value)
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
            error: "Failed to get exchange progress",
            message: e.message ?? e.stack ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}