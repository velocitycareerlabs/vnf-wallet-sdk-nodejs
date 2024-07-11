/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { getJwtSignServiceUrl } from "./Urls";
import { CurrentEnvironment } from "../../GlobalConfig";
import fetcher from "./Fetcher";
import { Dictionary, Nullish, VCLDidJwk, VCLJwtDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function generateSignedJwtFetcher(
    jwtDescriptor: VCLJwtDescriptor,
    didJwk: VCLDidJwk,
    nonce: Nullish<string>,
): Promise<Dictionary<any>> {
    const config = {
        url: getJwtSignServiceUrl(CurrentEnvironment),
        method: 'POST',
        data: generateJwtPayloadToSign(
            jwtDescriptor,
            nonce,
            didJwk
        ),
    };
    return await fetcher(config);
}

function generateJwtPayloadToSign(
    jwtDescriptor: VCLJwtDescriptor,
    nonce: Nullish<string>,
    didJwk: VCLDidJwk
): Dictionary<any> {
    const payload: Dictionary<any> = jwtDescriptor.payload ? { ...jwtDescriptor.payload } : {};
    return {
        header: {
            jwk: didJwk.publicJwk.valueJson,
            kid: didJwk.kid
        },
        payload: {
            ...payload,
            nonce: nonce,
            aud: jwtDescriptor.aud,
            jti: jwtDescriptor.jti,
            iss: jwtDescriptor.iss
        },
        options: {
            keyId: didJwk.keyId
        }
    };
}