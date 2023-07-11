import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface JwtServiceUseCase {
    verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLJwkPublic,
        completionBlock: (r: VCLResult<boolean>) => any
    ): void;

    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        completionBlock: (r: VCLResult<VCLJwt>) => any
    ): void;

    generateDidJwk(
        didJwkDescriptor: Nullish<VCLDidJwkDescriptor>,
        completionBlock: (r: VCLResult<VCLDidJwk>) => any
    ): void;
}
