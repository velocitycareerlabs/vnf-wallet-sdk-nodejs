/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { FastifyReply, FastifyRequest } from "fastify";

export async function getPresentationRequest(
    req: FastifyRequest,
    reply: FastifyReply,
) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const deepLink = req.body
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reply.send(await req.vclSdk.getPresentationRequest(deepLink));
}