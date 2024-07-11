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
    VCLFinalizeOffersDescriptor,
    VCLCredentialTypesUIFormSchemaDescriptor,
    VCLVerifiedProfileDescriptor,
    VCLPublicJwk,
    VCLJwtDescriptor,
    VCLDidJwkDescriptor
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export const deepLinkFrom = (deepLink: any): VCLDeepLink => {
    return new VCLDeepLink(deepLink.value ?? deepLink);
}

export const tokenFrom = (token: any): VCLToken => {
    return new VCLToken(token.value ?? token);
}

export const jwtFromJson = (json: Dictionary<any>): VCLJwt => {
    return VCLJwt.fromEncodedJwt(json.encodedJwt);
}

export const publicJwkFrom = (json: Dictionary<any>): VCLPublicJwk => {
    return VCLPublicJwk.fromJSON(json);
}

export const didJwkFrom = (json: Dictionary<any>): VCLDidJwk => {
    return VCLDidJwk.fromJSON(json);
}

export const presentationRequestDescriptorFrom = (json: Dictionary<any>, didJwk: VCLDidJwk): VCLPresentationRequestDescriptor => {
    const deepLink = deepLinkFrom(json)
    return new VCLPresentationRequestDescriptor(
        deepLink,
        null,
        didJwk,
        json.remoteCryptoServicesToken ? new VCLToken(json.remoteCryptoServicesToken) : null
    )
}

export const presentationSubmissionFrom = (json: Dictionary<any>): VCLPresentationSubmission => {
    const presentationRequestJson = json.presentationRequest;
    const verifiableCredentials = json.verifiableCredentials
    const presentationRequest = new VCLPresentationRequest(
        jwtFromJson(presentationRequestJson.jwt),
        new VCLVerifiedProfile(presentationRequestJson.verifiedProfile.payload),
        new VCLDeepLink(presentationRequestJson.deepLink.value),
        null,
        didJwkFrom(presentationRequestJson.didJwk),
        json.remoteCryptoServicesToken ? new VCLToken(json.remoteCryptoServicesToken) : null
    )
    return new VCLPresentationSubmission(
        presentationRequest,
        verifiableCredentials
    );
}

export const submissionResultFrom = (json: Dictionary<any>): VCLSubmissionResult => {
    const submissionResultJson = json;
    return new VCLSubmissionResult(
        tokenFrom(submissionResultJson.sessionToken.value),
        new VCLExchange(submissionResultJson.exchange),
        submissionResultJson.jti,
        submissionResultJson.submissionId
    );
}

export const organizationsSearchDescriptorFrom = (json: Dictionary<any>): VCLOrganizationsSearchDescriptor => {
    return new VCLOrganizationsSearchDescriptor(
        new VCLFilter(json.filter.did, null, null),
    );
}

const credentialManifestDescriptorByDeepLinkFrom = (
    json: Dictionary<any>,
    didJwk: VCLDidJwk
): VCLCredentialManifestDescriptorByDeepLink => {
    return new VCLCredentialManifestDescriptorByDeepLink(
        deepLinkFrom(json),
        VCLIssuingType.Career,
        null,
        didJwk,
    );
}

const credentialManifestDescriptorByServiceFrom = (
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

export const credentialManifestDescriptorFrom = (
    json: Dictionary<any>,
    didJwk: VCLDidJwk
): VCLCredentialManifestDescriptor => {
    return json.value ? // deep link
        credentialManifestDescriptorByDeepLinkFrom(json, didJwk) :
        credentialManifestDescriptorByServiceFrom(json, didJwk)
}

export const credentialManifestFrom = (json: Dictionary<any>): VCLCredentialManifest => {
    return new VCLCredentialManifest(
        jwtFromJson(json.jwt),
        json.vendorOriginContext,
        new VCLVerifiedProfile(json.verifiedProfile.payload),
        json.deepLink ? new VCLDeepLink(json.deepLink.value) : null,
        didJwkFrom(json.didJwk),
        json.remoteCryptoServicesToken ? new VCLToken(json.remoteCryptoServicesToken) : null

    );
}

export const generateOffersDescriptorFrom = (json: Dictionary<any>): VCLGenerateOffersDescriptor => {
    const credentialManifest = credentialManifestFrom(json.credentialManifest)
    const identificationVerifiableCredentials =
        json.identificationVerifiableCredentials.map((vc: Dictionary<any>) => VCLVerifiableCredential.fromJSON(vc))
    return new VCLGenerateOffersDescriptor(
        credentialManifest,
        json.types,
        null,
        identificationVerifiableCredentials
    );
}

export const finalizeOffersDescriptorFrom = (json: Dictionary<any>): VCLFinalizeOffersDescriptor => {
    const credentialManifest = credentialManifestFrom(json.credentialManifest)
    return new VCLFinalizeOffersDescriptor(
        credentialManifest,
        json.challenge,
        json.approvedOfferIds,
        json.rejectedOfferIds
    );
}

export const credentialTypesUIFormSchemaDescriptorFrom = (json: Dictionary<any>): VCLCredentialTypesUIFormSchemaDescriptor => {
    return new VCLCredentialTypesUIFormSchemaDescriptor(
        json.credentialType,
        json.countryCode
    );
}

export const verifiedProfileDescriptorFrom = (json: Dictionary<any>): VCLVerifiedProfileDescriptor => {
    return new VCLVerifiedProfileDescriptor(json.did)
}

export const jwtDescriptorFrom = (json: Dictionary<any>): VCLJwtDescriptor => {
    return new VCLJwtDescriptor(json.payload, json.jti, json.iss, json.aud);
}

export const didJwkDescriptorFrom = (json: Dictionary<any>): VCLDidJwkDescriptor => {
    return new VCLDidJwkDescriptor(json.signatureAlgorithm, null);
}