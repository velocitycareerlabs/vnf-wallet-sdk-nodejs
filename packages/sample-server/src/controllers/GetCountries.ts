/**
 * Created by Michael Avoyan on 08/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

export async function getCountries(req, reply) {
    try {
        reply.send(req.vclSdk.countries);
    } catch (e: any) {
        reply.code(e.statusCode ?? 500).send(e)
    }
}