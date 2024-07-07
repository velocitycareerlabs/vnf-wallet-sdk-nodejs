/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifiedProfileDescriptorFromJson } from "../utils/Converter";

export async function getVerifiedProfile(req, reply) {
    try {
        const verifiedProfile = await req.vclSdk.getVerifiedProfile(
            verifiedProfileDescriptorFromJson(req.body)
        );
        reply.send(verifiedProfile);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: "500",
            error: "Failed to get credential types UI form schema",
            message: e.message ?? e.stack ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}