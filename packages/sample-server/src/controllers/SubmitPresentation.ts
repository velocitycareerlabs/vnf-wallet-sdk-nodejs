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
        reply.code(e.statusCode ?? 500).send(e)
    }
}