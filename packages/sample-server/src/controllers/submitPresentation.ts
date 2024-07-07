/**
 * Created by Michael Avoyan on 02/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { presentationSubmissionFromJson } from "../utils/Converter";

export async function submitPresentation(req, reply) {
    try {
        const submissionResult = await req.vclSdk.submitPresentation(presentationSubmissionFromJson(req.body));
        reply.send(submissionResult);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: e.statusCode ?? "500",
            error: "Failed to get exchange progress",
            message: e.stack ?? e.message ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}