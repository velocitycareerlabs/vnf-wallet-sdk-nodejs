/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    credentialManifestDescriptorFrom,
    credentialTypesUIFormSchemaDescriptorFrom,
    didJwkDescriptorFrom,
    didJwkFrom,
    finalizeOffersDescriptorFrom,
    generateOffersDescriptorFrom,
    jwtDescriptorFrom,
    jwtFromJson,
    organizationsSearchDescriptorFrom,
    presentationRequestDescriptorFrom,
    presentationSubmissionFrom, publicJwkFrom,
    submissionResultFrom,
    tokenFrom,
    verifiedProfileDescriptorFrom
} from "../utils/Converter";
import { VCLExchangeDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export default async function routes(fastify) {
    fastify.get(
        "/getCountries",
        (req, reply) => {
            reply.send(req.vclSdk.countries);
        }
    );
    fastify.get(
        "/getCredentialTypes",
        (req, reply) => {
            reply.send(req.vclSdk.credentialTypes);
        }
    );
    fastify.get(
        "/getCredentialTypeSchemas",
        (req, reply) => {
            reply.send(req.vclSdk.credentialTypeSchemas);
        }
    );
    fastify.post(
        "/getPresentationRequest",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getPresentationRequest(presentationRequestDescriptorFrom(req.body, req.didJwk))
            );
        }
    );
    fastify.post(
        "/submitPresentation",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.submitPresentation(presentationSubmissionFrom(req.body))
            );
        }
    );
    fastify.post(
        "/getExchangeProgress",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getExchangeProgress(
                    new VCLExchangeDescriptor(
                        presentationSubmissionFrom(req.body.presentationSubmission),
                        submissionResultFrom(req.body.submissionResult)
                    )
                ));
        }
    );
    fastify.post(
        "/searchForOrganizations",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.searchForOrganizations(organizationsSearchDescriptorFrom(req.body))
            );
        }
    );
    fastify.post(
        "/getCredentialManifest",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getCredentialManifest(
                    credentialManifestDescriptorFrom(req.body, req.didJwk)
                )
            )
        }
    );
    fastify.post(
        "/generateOffers",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.generateOffers(generateOffersDescriptorFrom(req.body))
            );
        }
    );
    fastify.post(
        "/checkOffers",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.checkForOffers(
                    generateOffersDescriptorFrom(req.body),
                    tokenFrom(req.body.sessionToken)
                )
            );
        }
    );
    fastify.post(
        "/finalizeOffers",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.finalizeOffers(
                    finalizeOffersDescriptorFrom(req.body.finalizeOffersDescriptor),
                    tokenFrom(req.body.sessionToken)
                )
            );
        }
    );
    fastify.post(
        "/getCredentialTypesUIFormSchema",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getCredentialTypesUIFormSchema(credentialTypesUIFormSchemaDescriptorFrom(req.body))
            );
        }
    );
    fastify.post(
        "/getVerifiedProfile",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getVerifiedProfile(verifiedProfileDescriptorFrom(req.body))
            );
        }
    );
    fastify.post(
        "/verifyJwt",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.verifyJwt(
                    jwtFromJson(req.body.jwt),
                    publicJwkFrom(req.body.publicJwk),
                    tokenFrom(req.body.remoteCryptoServicesToken)
                )
            );
        }
    );
    fastify.post(
        "/generateSignedJwt",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.generateSignedJwt(
                    jwtDescriptorFrom(req.body.jwtDescriptor),
                    didJwkFrom(req.body.didJwk),
                    tokenFrom(req.body.remoteCryptoServicesToken)
                )
            );
        }
    );
    fastify.post(
        "/generateDidJwk",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.generateDidJwk(didJwkDescriptorFrom(req.body))
            );
        }
    );
}