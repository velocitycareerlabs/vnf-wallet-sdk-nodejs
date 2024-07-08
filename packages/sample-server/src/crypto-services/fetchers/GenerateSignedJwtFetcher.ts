/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { getJwtSignServiceUrl } from "./Urls";
import { CurrentEnvironment } from "../../GlobalConfig";
import fetcher from "./Fetcher";
import {
    VCLDidJwk,
    VCLJwtDescriptor,
    Dictionary,
    Nullish
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

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
    const retVal: Dictionary<any> = {};
    const header: Dictionary<any> = {};
    const options: Dictionary<any> = {};
    const payload: Dictionary<any> = jwtDescriptor.payload ? { ...jwtDescriptor.payload } : {};

    header[CodingKeys.KeyJwk] = didJwk.publicJwk.valueJson;
    header[CodingKeys.KeyKid] = didJwk.kid;

    options[CodingKeys.KeyKeyId] = didJwk.keyId;

    payload[CodingKeys.KeyNonce] = nonce;
    payload[CodingKeys.KeyAud] = jwtDescriptor.aud;
    payload[CodingKeys.KeyJti] = jwtDescriptor.jti;
    payload[CodingKeys.KeyIss] = jwtDescriptor.iss;

    retVal[CodingKeys.KeyHeader] = header;
    retVal[CodingKeys.KeyOptions] = options;
    retVal[CodingKeys.KeyPayload] = payload;

    return retVal;
}

const CodingKeys = {
    KeyKeyId: "keyId",
    KeyKid: "kid",
    KeyJwk: "jwk",
    KeyIss: "iss",
    KeyAud: "aud",
    KeyJti: "jti",
    KeyNonce: "nonce",

    KeyHeader: "header",
    KeyOptions: "options",
    KeyPayload: "payload",

    KeyCompactJwt: "compactJwt"
};