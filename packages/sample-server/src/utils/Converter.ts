/**
 * Created by Michael Avoyan on 03/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Dictionary,
    issuingTypeFromString,
    VCLCredentialManifest,
    VCLCredentialManifestDescriptor,
    VCLCredentialManifestDescriptorByDeepLink,
    VCLCredentialManifestDescriptorByService,
    VCLDeepLink,
    VCLDidJwk,
    VCLExchange,
    VCLFilter,
    VCLGenerateOffersDescriptor,
    VCLIssuingType,
    VCLJwt,
    VCLOrganizationsSearchDescriptor,
    VCLPresentationRequest,
    VCLPresentationRequestDescriptor,
    VCLPresentationSubmission,
    VCLServiceCredentialAgentIssuer,
    VCLSubmissionResult,
    VCLToken,
    VCLVerifiableCredential,
    VCLVerifiedProfile,
    VCLFinalizeOffersDescriptor
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export const deepLinkFromString = (str: string): VCLDeepLink => {
    return new VCLDeepLink(str);
}

export const tokenFromString = (str: string): VCLToken => {
    return new VCLToken(str);
}

export const presentationRequestDescriptorFromJson = (json: Dictionary<any>, didJwk: VCLDidJwk): VCLPresentationRequestDescriptor => {
    const deepLink = deepLinkFromString(json.value)
    return new VCLPresentationRequestDescriptor(
        deepLink,
        null,
        didJwk,
        json.remoteCryptoServicesToken ? new VCLToken(json.remoteCryptoServicesToken) : null
    )
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
        json.remoteCryptoServicesToken ? new VCLToken(json.remoteCryptoServicesToken) : null
    )
    return new VCLPresentationSubmission(
        presentationRequest,
        verifiableCredentials
    );
}

export const submissionResultFromJson = (json: Dictionary<any>): VCLSubmissionResult => {
    const submissionResultJson = json;
    return new VCLSubmissionResult(
        tokenFromString(submissionResultJson.sessionToken.value),
        new VCLExchange(submissionResultJson.exchange),
        submissionResultJson.jti,
        submissionResultJson.submissionId
    );
}

export const organizationsSearchDescriptorFromJson = (json: Dictionary<any>): VCLOrganizationsSearchDescriptor => {
    return new VCLOrganizationsSearchDescriptor(
        new VCLFilter(json.filter.did, null, null),
    );
}

const credentialManifestDescriptorByDeepLinkFromJson = (
    json: Dictionary<any>,
    didJwk: VCLDidJwk
): VCLCredentialManifestDescriptorByDeepLink => {
    return new VCLCredentialManifestDescriptorByDeepLink(
        deepLinkFromString(json.value),
        VCLIssuingType.Career,
        null,
        didJwk,
    );
}

const credentialManifestDescriptorByServiceFromJson = (
    json: Dictionary<any>,
    didJwk: VCLDidJwk
): VCLCredentialManifestDescriptorByService => {
    return new VCLCredentialManifestDescriptorByService(
        new VCLServiceCredentialAgentIssuer(json.service),
        issuingTypeFromString(json.issuingType),
        json.credentialTypes,
        null,
        didJwk,
        null
    );
}

export const credentialManifestDescriptorFromJson = (
    json: Dictionary<any>,
    didJwk: VCLDidJwk
): VCLCredentialManifestDescriptor => {
    return json.value ? // deep link
        credentialManifestDescriptorByDeepLinkFromJson(json, didJwk) :
        credentialManifestDescriptorByServiceFromJson(json, didJwk)
}

export const credentialManifestFromJson = (json: Dictionary<any>): VCLCredentialManifest => {
    return new VCLCredentialManifest(
        VCLJwt.fromEncodedJwt(json.jwt.encodedJwt),
        json.vendorOriginContext,
        new VCLVerifiedProfile(json.verifiedProfile.payload),
        json.deepLink ? new VCLDeepLink(json.deepLink.value) : null,
        VCLDidJwk.fromJSON(json.didJwk),
        json.remoteCryptoServicesToken ? new VCLToken(json.remoteCryptoServicesToken) : null

    );
}

export const generateOffersDescriptorFromJson = (json: Dictionary<any>): VCLGenerateOffersDescriptor => {
    const credentialManifest = credentialManifestFromJson(json.credentialManifest)
    const identificationVerifiableCredentials =
        json.identificationVerifiableCredentials.map((vc: Dictionary<any>) => VCLVerifiableCredential.fromJSON(vc))
    return new VCLGenerateOffersDescriptor(
        credentialManifest,
        json.types,
        null,
        identificationVerifiableCredentials
    );
}

export const finalizeOffersDescriptorFromJson = (json: Dictionary<any>): VCLFinalizeOffersDescriptor => {
    const credentialManifest = credentialManifestFromJson(json.credentialManifest)
    return new VCLFinalizeOffersDescriptor(
        credentialManifest,
        json.challenge,
        json.approvedOfferIds,
        json.rejectedOfferIds
    );
}