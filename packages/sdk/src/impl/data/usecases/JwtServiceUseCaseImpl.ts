import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import JwtServiceUseCase from "../../domain/usecases/JwtServiceUseCase";

export default class JwtServiceUseCaseImpl implements JwtServiceUseCase {
    constructor(private readonly jwtServiceRepository: JwtServiceRepository) {}

    generateDidJwk(
        didJwkDescriptor: Nullish<VCLDidJwkDescriptor> = null,
        completionBlock: (r: VCLResult<VCLDidJwk>) => any
    ): void {
        this.jwtServiceRepository.generateDidJwk(
            didJwkDescriptor,
            completionBlock
        );
    }

    verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLJwkPublic,
        completionBlock: (r: VCLResult<boolean>) => any
    ): void {
        this.jwtServiceRepository.verifyJwt(jwt, jwkPublic, completionBlock);
    }
    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        completionBlock: (r: VCLResult<VCLJwt>) => any
    ): void {
        this.jwtServiceRepository.generateSignedJwt(
            jwtDescriptor,
            completionBlock
        );
    }
}
