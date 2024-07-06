/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { presentationRequestDescriptorFromJson } from "../utils/Converter";

export async function getPresentationRequest(req, reply) {
    try {
        const presentationRequest = await req.vclSdk.getPresentationRequest(
            presentationRequestDescriptorFromJson(req.body, req.didJwk)
        );
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