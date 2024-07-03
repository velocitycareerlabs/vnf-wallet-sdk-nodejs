/**
 * Created by Michael Avoyan on 24/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { VCLDidJwk, VCLDidJwkDescriptor, VCLKeyService } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import { generateDidJwkFetcher } from "./fetchers";

export class KeyServiceImpl implements VCLKeyService {

  async generateDidJwk(didJwkDescriptor: VCLDidJwkDescriptor): Promise<VCLDidJwk> {
    try {
      const didJwkJson = await generateDidJwkFetcher(
          didJwkDescriptor,
      );
      return new Promise((resolve) => {
        resolve(VCLDidJwk.fromJSON(didJwkJson));
      });
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }
}