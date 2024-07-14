/**
 * Created by Michael Avoyan on 03/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Dictionary,
    issuingTypeFromString,
    Nullish,
    VCLCredentialManifest,
    VCLCredentialManifestDescriptor,
    VCLCredentialManifestDescriptorByDeepLink,
    VCLCredentialManifestDescriptorByService,
    VCLCredentialManifestDescriptorRefresh,
    VCLCredentialTypesUIFormSchemaDescriptor,
    VCLDeepLink,
    VCLDidJwk,
    VCLDidJwkDescriptor,
    VCLExchange,
    VCLFilter,
    VCLFinalizeOffersDescriptor,
    VCLGenerateOffersDescriptor,
    VCLIssuingType,
    VCLJwt,
    VCLJwtDescriptor,
    VCLOrganizationsSearchDescriptor,
    VCLPresentationRequest,
    VCLPresentationRequestDescriptor,
    VCLPresentationSubmission,
    VCLPublicJwk,
    VCLServiceCredentialAgentIssuer,
    VCLSubmissionResult,
    VCLToken,
    VCLVerifiableCredential,
    VCLVerifiedProfile,
    VCLVerifiedProfileDescriptor
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export const deepLinkFrom = (deepLink: any): VCLDeepLink => {
    return new VCLDeepLink(deepLink.value ?? deepLink);
}

export const tokenFrom = (token: any): Nullish<VCLToken> => {
    return token? new VCLToken(token.value ?? token) : null;
}

export const jwtFromJson = (json: Dictionary<any>): VCLJwt => {
    return VCLJwt.fromEncodedJwt(json.encodedJwt);
}

export const publicJwkFrom = (json: Dictionary<any>): VCLPublicJwk => {
    return json.valueStr ? VCLPublicJwk.fromString(json.valueStr) :
        VCLPublicJwk.fromJSON(json.valueJson ?? json);
}

export const didJwkFrom = (json: Dictionary<any>): VCLDidJwk => {
    return VCLDidJwk.fromJSON(json);
}

export const presentationRequestDescriptorFrom = (json: Dictionary<any>): VCLPresentationRequestDescriptor => {
    const deepLink = deepLinkFrom(json.deepLink);
    const didJwk = didJwkFrom(json.didJwk);
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
        tokenFrom(submissionResultJson.sessionToken.value) ?? new VCLToken(""),
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

const credentialManifestDescriptorByDeepLinkFrom = (json: Dictionary<any>): VCLCredentialManifestDescriptorByDeepLink => {
    return new VCLCredentialManifestDescriptorByDeepLink(
        deepLinkFrom(json.deepLink),
        VCLIssuingType.Career,
        null,
        didJwkFrom(json.didJwk),
        null
    );
}

const credentialManifestDescriptorByServiceFrom = (json: Dictionary<any>): VCLCredentialManifestDescriptorByService => {
    return new VCLCredentialManifestDescriptorByService(
        new VCLServiceCredentialAgentIssuer(json.service),
        issuingTypeFromString(json.issuingType),
        json.credentialTypes,
        null,
        didJwkFrom(json.didJwk),
        null
    );
}

const credentialManifestDescriptorRefreshFrom = (json: Dictionary<any>): VCLCredentialManifestDescriptor => {
    return new VCLCredentialManifestDescriptorRefresh(
        json.service,
        json.credentialIds,
        didJwkFrom(json.didJwk),
        json.remoteCryptoServicesToken ? new VCLToken(json.remoteCryptoServicesToken) : null
    );
}

export const credentialManifestDescriptorFrom = (json: Dictionary<any>): VCLCredentialManifestDescriptor => {
    return json.credentialIds ? credentialManifestDescriptorRefreshFrom(json) : (
        json.service ? credentialManifestDescriptorByServiceFrom(json) : credentialManifestDescriptorByDeepLinkFrom(json)
    );
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