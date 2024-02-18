import { importJWK, JWK, jwtVerify } from "jose";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import VCLJwtVerifyService from "../../../api/jwt/VCLJwtVerifyService";

export default class VCLJwtVerifyServiceLocalImpl
    implements VCLJwtVerifyService
{
    async verify(
        jwt: VCLJwt,
        publicJwk: VCLPublicJwk
    ): Promise<VCLResult<boolean>> {
        let importedJwk = await importJWK(publicJwk.valueJson as JWK, "ECDSA");
        try {
            await jwtVerify(jwt.encodedJwt!, importedJwk);
            return new VCLResult.Success(true);
        } catch (error) {
            return new VCLResult.Success(false);
        }
    }
}
