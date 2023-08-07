import VCLDidJwk from "../../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../../api/entities/VCLDidJwkDescriptor";
import VCLJwt, { SignedJWT } from "../../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../../api/entities/VCLResult";

export default interface JwtService {
    parse(jwt: string): Nullish<SignedJWT>;

    encode(str: string): string;

    verify(jwt: VCLJwt, jwk: string): Promise<boolean>;

    sign(jwtDescriptor: VCLJwtDescriptor): Promise<Nullish<SignedJWT>>;

    generateDidJwk(
        didJwkDescriptor: Nullish<VCLDidJwkDescriptor>
    ): Promise<VCLDidJwk>;
}
