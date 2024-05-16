import { Nullish, VCLJwtSignService } from "../../../../src";
import VCLJwtDescriptor from "../../../../src/api/entities/VCLJwtDescriptor";
import VCLDidJwk from "../../../../src/api/entities/VCLDidJwk";
import VCLResult from "../../../../src/api/entities/VCLResult";
import VCLJwt from "../../../../src/api/entities/VCLJwt";

export class JwtSignServiceMock implements VCLJwtSignService {
    sign(
        jwtDescriptor: VCLJwtDescriptor,
        didJwk: VCLDidJwk,
        nonce: Nullish<string>
    ): Promise<VCLResult<VCLJwt>> {
        throw new Error("Method not implemented.");
    }
}