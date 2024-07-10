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
            finalizeOffersDescriptorFromJson(req.body.finalizeOffersDescriptor),
            tokenFromString(req.body.sessionToken.value)
        );
        reply.send(jwtVerifiableCredentials);
    } catch (e: any) {
        reply.code(e.statusCode ?? 500).send(e)
    }
}