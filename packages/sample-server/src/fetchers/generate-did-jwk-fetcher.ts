/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { getCreateDidKeyServiceUrl } from "./urls";
import { CurrentEnvironment } from "../global";
import fetcher from "./fetcher";
import { Dictionary, VCLDidJwkDescriptor } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export async function generateDidJwkFetcher(didJwkDescriptor: VCLDidJwkDescriptor): Promise<Dictionary<any>> {
    const config = {
        url: getCreateDidKeyServiceUrl(CurrentEnvironment),
        method: 'POST',
        data: {
            crv: `${didJwkDescriptor.signatureAlgorithm}`,
            didMethod: 'did:jwk',
        }
    };
    return fetcher(config);
}