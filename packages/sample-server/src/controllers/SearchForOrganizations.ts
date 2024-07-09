/**
 * Created by Michael Avoyan on 04/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { organizationsSearchDescriptorFromJson } from "../utils/Converter";

export async function searchForOrganizations(req, reply) {
    try {
        const organizations = await req.vclSdk.searchForOrganizations(
            organizationsSearchDescriptorFromJson(req.body)
        );
        reply.send(organizations);
    } catch (e: any) {
        reply.code(e.statusCode ?? 500).send(e)
    }
}