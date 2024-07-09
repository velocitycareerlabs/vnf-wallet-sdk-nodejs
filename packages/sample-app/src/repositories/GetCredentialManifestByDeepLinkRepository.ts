/**
 * Created by Michael Avoyan on 09/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import Urls from "../network/Urls";
import fetcher from "../network/Fetcher";
import { Dictionary } from "../Types";

export const getCredentialManifest = async (deepLink: string): Promise<Dictionary<any>> => {
    const config = {
        url: Urls.getCredentialManifest,
        method: 'POST',
        data: { "value": deepLink },
    };
    return await fetcher(config);
}