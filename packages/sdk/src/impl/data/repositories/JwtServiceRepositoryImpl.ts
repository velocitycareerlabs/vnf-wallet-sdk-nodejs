import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLError from "../../../api/entities/error/VCLError";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt, { SignedJWT } from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import VCLJwtSignService from "../../../api/jwt/VCLJwtSignService";
import VCLJwtVerifyService from "../../../api/jwt/VCLJwtVerifyService";
import { Nullish } from "../../../api/VCLTypes";
import VCLToken from "../../../api/entities/VCLToken";

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
        publicJwk: Nullish<VCLPublicJwk>,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<boolean>> {
        try {
            return await this.jwtVerifyService.verify(
                jwt,
                publicJwk,
                remoteCryptoServicesToken
            );
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error!));
        }
    }
    async generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        nonce: Nullish<string>,
        didJwk: VCLDidJwk,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<VCLJwt>> {
        try {
            return await this.jwtSignService.sign(
                jwtDescriptor,
                didJwk,
                nonce,
                remoteCryptoServicesToken
            );
        } catch (error) {
            return new VCLResult.Error(
                new VCLError(`Failed to sign ${jwtDescriptor.payload}`)
            );
        }
    }
}
