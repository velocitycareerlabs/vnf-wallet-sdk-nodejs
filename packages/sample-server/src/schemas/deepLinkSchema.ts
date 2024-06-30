/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

export const deepLinkSchema = {
    type: "object",
    properties: {
        deepLink: {
            type: "object",
            properties: {
                value: { type: "string" },
            },
        },
    },
};