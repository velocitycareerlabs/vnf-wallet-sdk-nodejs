/**
 * Created by Michael Avoyan on 08/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

export async function getCredentialTypes(req, reply) {
    try {
        reply.send(req.vclSdk.credentialTypes);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: e.statusCode ?? "500",
            error: "Failed to get credential types",
            message: e.stack ?? e.message ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}