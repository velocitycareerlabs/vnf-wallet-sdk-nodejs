/**
 * Created by Michael Avoyan on 03/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Dictionary,
    VCLDeepLink,
    VCLDidJwk,
    VCLExchange,
    VCLJwt,
    VCLPresentationRequest,
    VCLPresentationSubmission,
    VCLSubmissionResult,
    VCLToken,
    VCLVerifiedProfile
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export const deepLinkFromString = (str: string): VCLDeepLink => {
    return new VCLDeepLink(str);
}

export const presentationSubmissionFromJson = (json: Dictionary<any>): VCLPresentationSubmission => {
    const presentationRequestJson = json.presentationRequest;
    const verifiableCredentials = json.verifiableCredentials
    const presentationRequest = new VCLPresentationRequest(
        VCLJwt.fromEncodedJwt(presentationRequestJson.jwt.encodedJwt),
        new VCLVerifiedProfile(presentationRequestJson.verifiedProfile.payload),
        new VCLDeepLink(presentationRequestJson.deepLink.value),
        null,
        VCLDidJwk.fromJSON(presentationRequestJson.didJwk),
        json.remoteCryptoServicesToken
    )
    return new VCLPresentationSubmission(
        presentationRequest,
        verifiableCredentials
    );
}

export const submissionResultFromJson = (json: Dictionary<any>): VCLSubmissionResult => {
    const submissionResultJson = json;
    return new VCLSubmissionResult(
        new VCLToken(submissionResultJson.sessionToken),
        new VCLExchange(submissionResultJson.exchange),
        submissionResultJson.jti,
        submissionResultJson.submissionId
    );
}