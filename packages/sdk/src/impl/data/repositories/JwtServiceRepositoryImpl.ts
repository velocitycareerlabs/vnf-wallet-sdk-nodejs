import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLError from "../../../api/entities/error/VCLError";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt, { SignedJWT } from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import VCLJwtSignService from "../../../api/jwt/VCLJwtSignService";
import VCLJwtVerifyService from "../../../api/jwt/VCLJwtVerifyService";

export default class JwtServiceRepositoryImpl implements JwtServiceRepository {
    constructor(
        private readonly jwtSignService: VCLJwtSignService,
        private readonly jwtVerifyService: VCLJwtVerifyService
    ) {}

    async decode(encodedJwt: string): Promise<VCLResult<VCLJwt>> {
        try {
            const parsed = SignedJWT.parse(encodedJwt);
            if (parsed) {
                return new VCLResult.Success(new VCLJwt(parsed));
            }

            throw new Error(`Failed to parse ${encodedJwt}`);
        } catch (ex: any) {
            return new VCLResult.Error(new VCLError(ex));
        }
    }
    async verifyJwt(
        jwt: VCLJwt,
        publicJwk: VCLPublicJwk
    ): Promise<VCLResult<boolean>> {
        try {
            const it = await this.jwtVerifyService.verify(jwt, publicJwk);
            return it;
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error!));
        }
    }
    async generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        nonce: Nullish<string>,
        didJwk: VCLDidJwk
    ): Promise<VCLResult<VCLJwt>> {
        try {
            const it = await this.jwtSignService.sign(
                jwtDescriptor,
                didJwk,
                nonce
            );
            return it;
        } catch (error) {
            return new VCLResult.Error(
                new VCLError(`Failed to sign ${jwtDescriptor.payload}`)
            );
        }
    }
}
