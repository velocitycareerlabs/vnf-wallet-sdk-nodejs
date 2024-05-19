import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import JwtServiceUseCase from "../../domain/usecases/JwtServiceUseCase";
import { Nullish } from "../../../api/VCLTypes";
import VCLToken from "../../../api/entities/VCLToken";

export default class JwtServiceUseCaseImpl implements JwtServiceUseCase {
    constructor(private readonly jwtServiceRepository: JwtServiceRepository) {}

    verifyJwt(
        jwt: VCLJwt,
        publicJwk: Nullish<VCLPublicJwk>,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ) {
        return this.jwtServiceRepository.verifyJwt(jwt, publicJwk, remoteCryptoServicesToken);
    }
    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        nonce: Nullish<string>,
        didJwk: VCLDidJwk,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ) {
        return this.jwtServiceRepository.generateSignedJwt(jwtDescriptor, nonce, didJwk, remoteCryptoServicesToken);
    }
}
