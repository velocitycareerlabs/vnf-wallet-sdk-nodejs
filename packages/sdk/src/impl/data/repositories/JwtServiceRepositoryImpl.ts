import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLError from "../../../api/entities/VCLError";
import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtService from "../../domain/infrastructure/jwt/JwtService";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";

export default class JwtServiceRepositoryImpl implements JwtServiceRepository {
    constructor(private readonly jwtService: JwtService) {}

    async decode(encodedJwt: string): Promise<VCLResult<VCLJwt>> {
        try {
            let parsed = this.jwtService.parse(encodedJwt);
            if (parsed) {
                return new VCLResult.Success(new VCLJwt(parsed));
            }

            throw new Error("Failed to parse $encodedJwt");
        } catch (ex: any) {
            return new VCLResult.Error(new VCLError(ex));
        }
    }
    async verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLJwkPublic
    ): Promise<VCLResult<boolean>> {
        try {
            let it = await this.jwtService.verify(jwt, jwkPublic.valueStr);
            return new VCLResult.Success(it ?? false);
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error!));
        }
    }
    async generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor
    ): Promise<VCLResult<VCLJwt>> {
        try {
            let it = await this.jwtService.sign(jwtDescriptor);
            return new VCLResult.Success(new VCLJwt(it!));
        } catch (error) {
            return new VCLResult.Error(
                new VCLError(`Failed to sign ${jwtDescriptor.payload}`)
            );
        }
    }
    async generateDidJwk(
        didJwkDescriptor: Nullish<VCLDidJwkDescriptor>
    ): Promise<VCLResult<VCLDidJwk>> {
        try {
            let didJwk = await this.jwtService.generateDidJwk(didJwkDescriptor);
            return new VCLResult.Success(didJwk);
        } catch (e: any) {
            return new VCLResult.Error(new VCLError(e));
        }
    }
}
