/**
 * Created by Michael Avoyan on 15/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { isArray } from "lodash/fp";
import VCLLog from "./VCLLog";
import Request, { HttpMethod } from "../data/infrastructure/network/Request";
import { HeaderKeys, HeaderValues } from "../data/repositories/Urls";
import { Dictionary } from "../../api/VCLTypes";
import VCLError from "../../api/entities/error/VCLError";
import VCLErrorCode from "../../api/entities/error/VCLErrorCode";

export interface NetworkService {
    sendRequest: (request: Request) => Promise<any>;
}

export const loadJsonldContext = async (
    issuerVcPayload: Dictionary<any>, // Consider defining a more specific type
    networkService: NetworkService
): Promise<any> => {
    if (issuerVcPayload.credentialSubject && issuerVcPayload.credentialSubject['@context']) {
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
                    useCaches: true, // Consider enabling caching
                    contentType: Request.ContentTypeApplicationJson,
                });
                const parsedResponse = JSON.parse(response.payload);
                return parsedResponse && parsedResponse['@context'] ? parsedResponse['@context'] : null;
            } catch (error) {
                VCLLog.e(`Failed to load JSON-LD context from ${jsonldContextUrl}`, JSON.stringify(error));
                return null;
            }
        });

        const jsonldContexts = await Promise.all(jsonldContextPromises);
        const validContexts = jsonldContexts.filter(context => context !== null);

        VCLLog.i("Loaded JSON-LD contexts", JSON.stringify({ extractedContext, validContexts }));
        return validContexts;
    } else if (!issuerVcPayload.credentialSubject) {
        throw new VCLError('credentialSubject is NULL', VCLErrorCode.InvalidCredentialSubjectType);
    } else {
        throw new VCLError('credentialSubject[@context] is NULL', VCLErrorCode.InvalidCredentialSubjectContext);
    }
};