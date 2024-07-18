/**
 * Created by Michael Avoyan on 15/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { isArray, merge } from "lodash/fp";
import VCLLog from "./VCLLog";
import Request, { HttpMethod } from "../data/infrastructure/network/Request";
import { HeaderKeys, HeaderValues } from "../data/repositories/Urls";
import { Dictionary } from "../../api/VCLTypes";

export interface NetworkService {
    sendRequest: (request: Request) => Promise<any>;
}

export const loadJsonldContext = async (
    issuerVcPayload: Dictionary<any>, // Consider defining a more specific type
    networkService: NetworkService
): Promise<any> => { // Consider defining a more specific return type
    const extractedContext = isArray(issuerVcPayload.credentialSubject['@context'])
        ? issuerVcPayload.credentialSubject['@context']
        : [issuerVcPayload.credentialSubject['@context']];

    const jsonldContextPromises = extractedContext.map(async (jsonldContextUrl: string) => {
        try {
            const response = await networkService.sendRequest({
                endpoint: jsonldContextUrl,
                method: HttpMethod.GET,
                body: null,
                headers: {
                    [HeaderKeys.XVnfProtocolVersion]: HeaderValues.XVnfProtocolVersion,
                },
                useCaches: false,
                contentType: Request.ContentTypeApplicationJson,
            });
            return response.payload;
        } catch (error) {
            VCLLog.e("Failed to load JSON-LD context", JSON.stringify(error));
            return null; // Return null or an appropriate default value on error
        }
    });

    const jsonldContexts = await Promise.all(jsonldContextPromises);
    const validContexts = jsonldContexts.filter(context => context !== null);
    if (validContexts.length === 0) {
        VCLLog.e("No valid JSON-LD contexts were loaded", "");
        // Handle the case where no valid contexts were loaded
    }

    VCLLog.i("Loaded JSON-LD contexts", JSON.stringify({ extractedContext, validContexts }));
    return merge({}, ...validContexts); // Merge all valid contexts into a single object
};