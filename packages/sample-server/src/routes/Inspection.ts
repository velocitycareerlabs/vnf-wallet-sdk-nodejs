/**
 * Created by Michael Avoyan on 14/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    presentationRequestDescriptorFrom,
    presentationSubmissionFrom,
    submissionResultFrom
} from "../utils/Converter";
import { VCLExchangeDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export default async function inspectionRoutes(fastify) {
    fastify.post(
        "/getPresentationRequest",
        async (req, reply) => {
            reply.send(
                await req.vclSdk.getPresentationRequest(presentationRequestDescriptorFrom(req.body))
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
}