/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { JSONSchema7TypeName } from 'json-schema';

export const presentationRequestSchema = {
    $id: "presentationRequestSchema",
    type: "object" as JSONSchema7TypeName,
    // define the properties of the object here
} as const;
