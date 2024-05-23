import { Nullish, VCLJwtSignService } from "../../../../src";
import VCLJwtDescriptor from "../../../../src/api/entities/VCLJwtDescriptor";
import VCLDidJwk from "../../../../src/api/entities/VCLDidJwk";
import VCLResult from "../../../../src/api/entities/VCLResult";
import VCLJwt from "../../../../src/api/entities/VCLJwt";
import VCLToken from "../../../../src/api/entities/VCLToken";

export class JwtSignServiceMock implements VCLJwtSignService {
    constructor(readonly successValue: Nullish<string> = null) {
    }
    sign(
        jwtDescriptor: VCLJwtDescriptor,
        didJwk: VCLDidJwk,
        nonce: Nullish<string>,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<VCLJwt>> {
        return Promise.resolve(new VCLResult.Success(VCLJwt.fromEncodedJwt(this.successValue || '')));
    }
}