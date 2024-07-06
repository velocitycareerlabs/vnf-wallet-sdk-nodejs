/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    getPresentationRequest,
    submitPresentation,
    getExchangeProgress,
    searchForOrganizations,
    getCredentialManifest,
    generateOffers,
    checkForOffers
} from "../controllers";

export default async function routes(fastify) {
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
}