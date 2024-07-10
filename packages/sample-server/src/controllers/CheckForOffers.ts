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
            generateOffersDescriptorFromJson(req.body.generateOffersDescriptor),
            tokenFromString(req.body.sessionToken.value)
        );
        reply.send(offers);
    } catch (e: any) {
        reply.code(e.statusCode ?? 500).send(e)
    }
}