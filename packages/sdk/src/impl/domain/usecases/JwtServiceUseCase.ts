import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface JwtServiceUseCase {
    verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLPublicJwk
    ): Promise<VCLResult<boolean>>;

    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        nonce: string | null | undefined,
        didJwk: VCLDidJwk
    ): Promise<VCLResult<VCLJwt>>;
}
