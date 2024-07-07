/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { didJwkDescriptorFromJson } from "../utils/Converter";

export async function generateDidJwk(req, reply) {
    try {
        const didJwk = await req.vclSdk.generateDidJwk(didJwkDescriptorFromJson(req.body));
        reply.send(didJwk);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: e.statusCode ?? "500",
            error: "Failed to generate did jwk",
            message: e.stack ?? e.message ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}