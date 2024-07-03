/**
 * Created by Michael Avoyan on 02/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { VCLPresentationSubmission } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function submitPresentation(req, reply) {
    try {
        const presentationSubmission = new VCLPresentationSubmission(
            req.body.presentationRequest,
            req.body.verifiableCredentials
        )
        const submissionResult = await req.vclSdk.submitPresentation(presentationSubmission);
        reply.send(submissionResult);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: "500",
            error: e,
            message: "Failed to submit presentation",
        });
    }
}