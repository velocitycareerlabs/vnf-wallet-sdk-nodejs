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
        const extractedContexts = isArray(issuerVcPayload.credentialSubject['@context'])
            ? issuerVcPayload.credentialSubject['@context']
            : [issuerVcPayload.credentialSubject['@context']];

        const jsonldContextPromises = extractedContexts.map(async (jsonldContextUrl: string) => {
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
                return JSON.parse(response.payload)
            } catch (error) {
                VCLLog.e(`Failed to load JSON-LD context from ${jsonldContextUrl}`, JSON.stringify(error));
                return null;
            }
        });

        const jsonldContexts = await Promise.all(jsonldContextPromises);
        const validContexts = jsonldContexts.filter(context => context !== null);

        if (validContexts.length > 0)
            return validContexts[0]
        throw new VCLError('context not found', VCLErrorCode.InvalidCredentialSubjectContext);
    } else if (!issuerVcPayload.credentialSubject) {
        throw new VCLError('credentialSubject is NULL', VCLErrorCode.InvalidCredentialSubjectType);
    } else {
        throw new VCLError('credentialSubject[@context] is NULL', VCLErrorCode.InvalidCredentialSubjectContext);
    }
};