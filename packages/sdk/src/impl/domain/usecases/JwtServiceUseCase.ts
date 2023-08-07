import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface JwtServiceUseCase {
    verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLJwkPublic
    ): Promise<VCLResult<boolean>>;

    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor
    ): Promise<VCLResult<VCLJwt>>;

    generateDidJwk(
        didJwkDescriptor: Nullish<VCLDidJwkDescriptor>
    ): Promise<VCLResult<VCLDidJwk>>;
}
