/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { VCLPresentationRequestDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function getPresentationRequest(req, reply,) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const deepLink = req.body
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    try {
        const presentationRequestDescriptor = new VCLPresentationRequestDescriptor(
            deepLink,
            null,
            req.didJwk,
            null
        )
        const presentationRequest = await req.vclSdk.getPresentationRequest(presentationRequestDescriptor);
        reply.send(presentationRequest);
    } catch (e: any) {
        reply.code(500).send({
            error: "Failed to get presentation request",
            message: JSON.stringify(e),
        });
    }
}