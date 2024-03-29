import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import JwtServiceUseCase from "../../domain/usecases/JwtServiceUseCase";

export default class JwtServiceUseCaseImpl implements JwtServiceUseCase {
    constructor(private readonly jwtServiceRepository: JwtServiceRepository) {}

    generateDidJwk(didJwkDescriptor: Nullish<VCLDidJwkDescriptor> = null) {
        return this.jwtServiceRepository.generateDidJwk(didJwkDescriptor);
    }

    verifyJwt(jwt: VCLJwt, jwkPublic: VCLPublicJwk) {
        return this.jwtServiceRepository.verifyJwt(jwt, jwkPublic);
    }
    generateSignedJwt(jwtDescriptor: VCLJwtDescriptor) {
        return this.jwtServiceRepository.generateSignedJwt(jwtDescriptor);
    }
}
