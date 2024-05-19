import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import { Nullish } from "../../../api/VCLTypes";

export default interface JwtServiceUseCase {
    verifyJwt(
        jwt: VCLJwt,
        publicJwk: VCLPublicJwk
    ): Promise<VCLResult<boolean>>;

    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        nonce: Nullish<string>,
        didJwk: VCLDidJwk
    ): Promise<VCLResult<VCLJwt>>;
}
