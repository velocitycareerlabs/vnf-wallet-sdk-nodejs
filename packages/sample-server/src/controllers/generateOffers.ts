/**
 * Created by Michael Avoyan on 04/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { generateOffersDescriptorFromJson } from "../utils/Converter";

export async function generateOffers(req, reply) {
    try {
        const offers = await req.vclSdk.generateOffers(
            generateOffersDescriptorFromJson(req.body),
        );
        reply.send(offers);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: "500",
            error: "Failed to generate offers",
            message: e.message ?? e.stack ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}