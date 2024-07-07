/**
 * Created by Michael Avoyan on 03/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { presentationSubmissionFromJson, submissionResultFromJson } from "../utils/Converter";
import { VCLExchangeDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function getExchangeProgress (req, reply) {
    try {
        const presentationSubmission = presentationSubmissionFromJson(req.body.presentationSubmission);
        const submissionResult = submissionResultFromJson(req.body.submissionResult);
        const exchangeProgressDescriptor = new VCLExchangeDescriptor(
            presentationSubmission,
            submissionResult
        );
        const exchangeProgress = await req.vclSdk.getExchangeProgress(exchangeProgressDescriptor);
        reply.send(exchangeProgress);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: e.statusCode ?? "500",
            error: "Failed to get exchange progress",
            message: e.stack ?? e.message ?? JSON.stringify(e),
            errorCode: e.errorCode,
        });
    }
}