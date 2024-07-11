/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    credentialManifestDescriptorFromJson,
    credentialTypesUIFormSchemaDescriptorFromJson, didJwkDescriptorFromJson, didJwkFromJson,
    finalizeOffersDescriptorFromJson,
    generateOffersDescriptorFromJson, jwtDescriptorFromJson, jwtFromJson,
    organizationsSearchDescriptorFromJson,
    presentationRequestDescriptorFromJson,
    presentationSubmissionFromJson, publicJwkFromJson,
    submissionResultFromJson,
    tokenFromString, verifiedProfileDescriptorFromJson
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
                await req.vclSdk.getPresentationRequest(presentationRequestDescriptorFromJson(req.body, req.didJwk))
            );
        }
    );
    fastify.post(
        "/submitPresentation",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.submitPresentation(presentationSubmissionFromJson(req.body))
            );
        }
    );
    fastify.post(
        "/getExchangeProgress",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getExchangeProgress(
                    new VCLExchangeDescriptor(
                        presentationSubmissionFromJson(req.body.presentationSubmission),
                        submissionResultFromJson(req.body.submissionResult)
                    )
                ));
        }
    );
    fastify.post(
        "/searchForOrganizations",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.searchForOrganizations(organizationsSearchDescriptorFromJson(req.body))
            );
        }
    );
    fastify.post(
        "/getCredentialManifest",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getCredentialManifest(
                    credentialManifestDescriptorFromJson(req.body, req.didJwk)
                )
            )
        }
    );
    fastify.post(
        "/generateOffers",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.generateOffers(generateOffersDescriptorFromJson(req.body))
            );
        }
    );
    fastify.post(
        "/checkOffers",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.checkForOffers(
                    generateOffersDescriptorFromJson(req.body),
                    tokenFromString(req.body.sessionToken.value)
                )
            );
        }
    );
    fastify.post(
        "/finalizeOffers",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.finalizeOffers(
                    finalizeOffersDescriptorFromJson(req.body),
                    tokenFromString(req.body.sessionToken.value)
                )
            );
        }
    );
    fastify.post(
        "/getCredentialTypesUIFormSchema",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getCredentialTypesUIFormSchema(credentialTypesUIFormSchemaDescriptorFromJson(req.body))
            );
        }
    );
    fastify.post(
        "/getVerifiedProfile",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getVerifiedProfile(verifiedProfileDescriptorFromJson(req.body))
            );
        }
    );
    fastify.post(
        "/verifyJwt",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.verifyJwt(
                    jwtFromJson(req.body.jwt),
                    publicJwkFromJson(req.body.publicJwk),
                    tokenFromString(req.body.remoteCryptoServicesToken)
                )
            );
        }
    );
    fastify.post(
        "/generateSignedJwt",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.generateSignedJwt(
                    jwtDescriptorFromJson(req.body.jwtDescriptor),
                    didJwkFromJson(req.body.didJwk),
                    tokenFromString(req.body.remoteCryptoServicesToken)
                )
            );
        }
    );
    fastify.post(
        "/generateDidJwk",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.generateDidJwk(didJwkDescriptorFromJson(req.body))
            );
        }
    );
}