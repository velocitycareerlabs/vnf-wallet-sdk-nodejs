/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { didJwkFromJson, jwtDescriptorFromJson, tokenFromString } from "../utils/Converter";

export async function generateSignedJwt(req, reply) {
    try {
        const jwt = await req.vclSdk.generateSignedJwt(
            jwtDescriptorFromJson(req.body.jwtDescriptor),
            didJwkFromJson(req.body.didJwk),
            tokenFromString(req.body.remoteCryptoServicesToken)
        );
        reply.send(jwt);
    } catch (e: any) {
        reply.code(e.statusCode ?? 500).send(e)
    }
}