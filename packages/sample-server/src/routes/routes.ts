/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    getPresentationRequest,
    submitPresentation,
    getExchangeProgress
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
}