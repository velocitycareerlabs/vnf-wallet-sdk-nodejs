/**
 * Created by Michael Avoyan on 09/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Dictionary } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import Urls from "../network/Urls";
import fetcher from "../network/Fetcher";

export const submitPresentation = async (presentationSubmission: Dictionary<any>): Promise<Dictionary<any>> => {
    const config = {
        url: Urls.submitPresentation,
        method: 'POST',
        data: presentationSubmission,
    };
    return await fetcher(config);
}