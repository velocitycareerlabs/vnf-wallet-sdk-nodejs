/* eslint-disable unused-imports/no-unused-vars,no-unused-vars */

import { Nullish, VCLJwt, VCLJwtVerifyService, VCLPublicJwk } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk";

export class JwtVerifyServiceMock implements VCLJwtVerifyService {
    async verify(jwt: VCLJwt, publicJwk: Nullish<VCLPublicJwk>): Promise<boolean> {
        return true;
    }
}