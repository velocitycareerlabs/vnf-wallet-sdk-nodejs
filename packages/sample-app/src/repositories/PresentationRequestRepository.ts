/**
 * Created by Michael Avoyan on 09/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Dictionary } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import fetcher from "../network/Fetcher";
import Urls from "../network/Urls";

export const getPresentationRequest = async (
    deepLink: Dictionary<any>
): Promise<Dictionary<any>> => {
    const config = {
        url: Urls.getPresentationRequest,
        method: 'POST',
        data: deepLink,
    };
    return await fetcher(config);
}