/**
 * Created by Michael Avoyan on 04/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateOffersDescriptorFromJson, tokenFromString } from "../utils/Converter";

export async function checkForOffers(req, reply) {
    try {
        const offers = await req.vclSdk.checkForOffers(
            generateOffersDescriptorFromJson(req.body),
            tokenFromString(req.body.sessionToken.value)
        );
        reply.send(offers);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: e.statusCode ?? "500",
            error: "Failed to check offers",
            message: e.stack ?? e.message ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}