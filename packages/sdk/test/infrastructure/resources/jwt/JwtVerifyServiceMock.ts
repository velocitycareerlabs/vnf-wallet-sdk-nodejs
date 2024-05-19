import { Nullish, VCLJwt, VCLJwtVerifyService, VCLPublicJwk, VCLResult } from "../../../../src";

export class JwtVerifyServiceMock implements VCLJwtVerifyService {
    verify(jwt: VCLJwt, publicJwk: Nullish<VCLPublicJwk>): Promise<VCLResult<boolean>> {
        return Promise.resolve(new VCLResult.Success(true));
    }
}