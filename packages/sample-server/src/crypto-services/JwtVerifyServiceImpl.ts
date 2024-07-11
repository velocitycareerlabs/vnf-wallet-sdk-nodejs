/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyJwtFetcher } from "./fetchers";
import { VCLPublicJwk, Nullish, VCLJwtVerifyService, VCLJwt } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

export class JwtVerifyServiceImpl implements VCLJwtVerifyService {
  async verify(
      jwt: VCLJwt,
      publicJwk: Nullish<VCLPublicJwk>,
  ): Promise<boolean> {
    const verificationJson = await verifyJwtFetcher(jwt, publicJwk);
    return verificationJson['verified'] as boolean || false
  }
}
