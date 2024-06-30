/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { VCLEnvironment } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

const BaseUrl = "mockvendor.velocitycareerlabs.io";

function getServiceBaseUrl(environment: VCLEnvironment): string {
    switch (environment) {
        case VCLEnvironment.Dev:
            return `https://${VCLEnvironment.Dev}.${BaseUrl}`;
        case VCLEnvironment.Qa:
            return `https://${VCLEnvironment.Qa}.${BaseUrl}`;
        case VCLEnvironment.Staging:
            return `https://${VCLEnvironment.Staging}.${BaseUrl}`;
        default:
            return `https://${BaseUrl}`;
    }
}

export function getJwtSignServiceUrl(environment: VCLEnvironment): string {
    return `${getServiceBaseUrl(environment)}/api/jwt/sign`;
}

export function getJwtVerifyServiceUrl(environment: VCLEnvironment): string {
    return `${getServiceBaseUrl(environment)}/api/jwt/verify`;
}

export function getCreateDidKeyServiceUrl(environment: VCLEnvironment): string {
    return `${getServiceBaseUrl(environment)}/api/create_did_key`;
}