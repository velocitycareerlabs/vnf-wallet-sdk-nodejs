/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    getCountries,
    getCredentialTypes,
    getCredentialTypeSchemas,
    getPresentationRequest,
    submitPresentation,
    getExchangeProgress,
    searchForOrganizations,
    getCredentialManifest,
    generateOffers,
    checkForOffers,
    finalizeOffers,
    getCredentialTypesUIFormSchema,
    getVerifiedProfile,
    verifyJwt,
    generateSignedJwt,
    generateDidJwk,

} from "../controllers";

export default async function routes(fastify) {
    fastify.get(
        "/getCountries",
        getCountries
    );
    fastify.get(
        "/getCredentialTypes",
        getCredentialTypes
    );
    fastify.get(
        "/getCredentialTypeSchemas",
        getCredentialTypeSchemas
    );
    fastify.post(
        "/getPresentationRequest",
        getPresentationRequest
    );
    fastify.post(
        "/submitPresentation",
        submitPresentation
    );
    fastify.post(
        "/getExchangeProgress",
        getExchangeProgress
    );
    fastify.post(
        "/searchForOrganizations",
        searchForOrganizations
    );
    fastify.post(
        "/getCredentialManifest",
        getCredentialManifest
    );
    fastify.post(
        "/generateOffers",
        generateOffers
    );
    fastify.post(
        "/checkOffers",
        checkForOffers
    );
    fastify.post(
        "/finalizeOffers",
        finalizeOffers
    );
    fastify.post(
        "/getCredentialTypesUIFormSchema",
        getCredentialTypesUIFormSchema
    );
    fastify.post(
        "/getVerifiedProfile",
        getVerifiedProfile
    );
    fastify.post(
        "/verifyJwt",
        verifyJwt
    );
    fastify.post(
        "/generateSignedJwt",
        generateSignedJwt
    );
    fastify.post(
        "/generateDidJwk",
        generateDidJwk
    );
}