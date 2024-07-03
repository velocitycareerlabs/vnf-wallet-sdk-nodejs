/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Nullish,
  VCLJwt,
  VCLJwtSignService,
  VCLDidJwk,
  VCLJwtDescriptor,
  VCLToken
} from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import { generateSignedJwtFetcher } from "./fetchers";

export class JwtSignServiceImpl implements VCLJwtSignService {
  async sign(
      jwtDescriptor: VCLJwtDescriptor,
      didJwk: VCLDidJwk,
      nonce: Nullish<string>,
      // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
      remoteCryptoServicesToken: Nullish<VCLToken>
  ): Promise<VCLJwt> {
    try {
      const jwtJson = await generateSignedJwtFetcher(jwtDescriptor, didJwk, nonce);
      return new Promise((resolve) => {
        resolve(VCLJwt.fromEncodedJwt(jwtJson['compactJwt'] as string));
      });
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }
}
