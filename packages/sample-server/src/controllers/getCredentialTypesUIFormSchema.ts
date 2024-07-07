/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { credentialTypesUIFormSchemaDescriptorFromJson } from "../utils/Converter";

export async function getCredentialTypesUIFormSchema(req, reply) {
    try {
        const credentialTypesUIFormSchema = await req.vclSdk.getCredentialTypesUIFormSchema(
            credentialTypesUIFormSchemaDescriptorFromJson(req.body)
        );
        reply.send(credentialTypesUIFormSchema);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: e.statusCode ?? "500",
            error: "Failed to get credential types UI form schema",
            message: e.stack ?? e.message ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}