/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { JSONSchema7TypeName } from 'json-schema';

export const deepLinkSchema = {
    $id: "deepLinkSchema",
    type: "object" as JSONSchema7TypeName,
    properties: {
        deepLink: {
            type: "object" as JSONSchema7TypeName,
            properties: {
                value: { type: "string" as JSONSchema7TypeName },
            },
        },
    },
} as const;