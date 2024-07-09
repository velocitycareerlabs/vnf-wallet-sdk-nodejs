/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { jwtFromJson, publicJwkFromJson, tokenFromString } from "../utils/Converter";

export async function verifyJwt(req, reply) {
    try {
        const isVerified = await req.vclSdk.verifyJwt(
            jwtFromJson(req.body.jwt),
            publicJwkFromJson(req.body.publicJwk),
            tokenFromString(req.body.remoteCryptoServicesToken)
        );
        reply.send(isVerified);
    } catch (e: any) {
        reply.code(e.statusCode ?? 500).send(e)
    }
}