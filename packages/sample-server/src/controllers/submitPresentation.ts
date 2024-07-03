/**
 * Created by Michael Avoyan on 02/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { VCLPresentationSubmission } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import {
    VCLDeepLink, VCLDidJwk,
    VCLJwt,
    VCLPresentationRequest,
    VCLVerifiedProfile
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function submitPresentation(req, reply) {
    try {
        const presentationRequestJson = req.body.presentationRequest;
        const verifiableCredentials = req.body.verifiableCredentials
        const presentationRequest = new VCLPresentationRequest(
            VCLJwt.fromEncodedJwt(presentationRequestJson.jwt.encodedJwt),
            new VCLVerifiedProfile(presentationRequestJson.verifiedProfile.payload),
            new VCLDeepLink(presentationRequestJson.deepLink.value),
            null,
            VCLDidJwk.fromJSON(presentationRequestJson.didJwk),
            req.body.remoteCryptoServicesToken
        )
        const presentationSubmission = new VCLPresentationSubmission(
            presentationRequest,
            verifiableCredentials
        )
        const submissionResult = await req.vclSdk.submitPresentation(presentationSubmission);
        reply.send(submissionResult);
    } catch (e: any) {
        reply.code(500).send({
            statusCode: "500",
            error: "Failed to submit presentation",
            message: e.message ?? JSON.stringify(e),
        });
    }
}