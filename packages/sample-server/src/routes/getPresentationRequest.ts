/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { FastifyInstance } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { presentationRequestSchema } from "../schemas/presentationRequestSchema";
import { getPresentationRequest } from "../controllers/getPresentationRequest";
import { deepLinkSchema } from "../schemas/deepLinkSchema";

interface getPresentationRequestInterface {
    Params: FromSchema<typeof presentationRequestSchema>;
}

export default async function routes(fastify: FastifyInstance) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fastify.post<getPresentationRequestInterface>(
        "/getPresentationRequest",
        {
            schema: {
                params: deepLinkSchema,
                response: {
                    200: presentationRequestSchema,
                    "4xx": { $ref: "errorSchema#" },
                },
            },
        },
        getPresentationRequest
    );
}