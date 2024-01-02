import VCLJwt from "../entities/VCLJwt";
import VCLPublicJwk from "../entities/VCLPublicJwk";
import VCLResult from "../entities/VCLResult";
import VCLToken from "../entities/VCLToken";

export default interface VCLJwtVerifyService {
    verify(
        jwt: VCLJwt,
        publicJwk: VCLPublicJwk,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<boolean>>;
}
