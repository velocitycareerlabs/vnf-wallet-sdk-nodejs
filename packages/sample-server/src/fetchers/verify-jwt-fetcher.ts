/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { getJwtVerifyServiceUrl } from "./urls";
import { CurrentEnvironment } from "../global";
import fetcher from "./fetcher";
import { VCLPublicJwk, VCLJwt, Nullish, Dictionary } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function verifyJwtFetcher(jwt: VCLJwt, publicJwk: Nullish<VCLPublicJwk>): Promise<Dictionary<any>> {
    const config = {
        url: getJwtVerifyServiceUrl(CurrentEnvironment),
        method: 'POST',
        data: generatePayloadToVerify(jwt, publicJwk),
    };
    return fetcher(config);
}

function generatePayloadToVerify(jwt: VCLJwt, publicJwk: Nullish<VCLPublicJwk>): Record<string, any> {
    const retVal: Record<string, any> = {};
    retVal['jwt'] = jwt.encodedJwt;
    retVal['publicKey'] = publicJwk?.valueJson || {};
    return retVal;
}

