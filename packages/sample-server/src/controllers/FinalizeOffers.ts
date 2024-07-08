/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { finalizeOffersDescriptorFromJson, tokenFromString } from "../utils/Converter";

export async function finalizeOffers(req, reply) {
    try {
        const jwtVerifiableCredentials = await req.vclSdk.finalizeOffers(
            finalizeOffersDescriptorFromJson(req.body),
            tokenFromString(req.body.sessionToken)
        );
        reply.send(jwtVerifiableCredentials);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: e.statusCode ?? "500",
            error: "Failed to finalize offers",
            message: e.stack ?? e.message ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}