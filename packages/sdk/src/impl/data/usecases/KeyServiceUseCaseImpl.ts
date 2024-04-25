import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import KeyServiceRepository from "../../domain/repositories/KeyServiceRepository";
import KeyServiceUseCase from "../../domain/usecases/KeyServiceUseCase";

export default class KeyServiceUseCaseImpl implements KeyServiceUseCase {
    constructor(private readonly keyServiceRepository: KeyServiceRepository) {}
    generateDidJwk(
        didJwkDescriptor: VCLDidJwkDescriptor
    ): Promise<VCLResult<VCLDidJwk>> {
        return this.keyServiceRepository.generateDidJwk(didJwkDescriptor);
    }
}
