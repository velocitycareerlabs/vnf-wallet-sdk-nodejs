/**
 * Created by Michael Avoyan on 27/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { FromSchema } from "json-schema-to-ts";
import { presentationRequestSchema } from "../schemas/presentationRequestSchema";

export type PresentationRequest = FromSchema<typeof presentationRequestSchema>;