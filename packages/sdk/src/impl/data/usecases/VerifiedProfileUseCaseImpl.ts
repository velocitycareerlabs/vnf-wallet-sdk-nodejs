import VCLVerifiedProfileDescriptor from "../../../api/entities/VCLVerifiedProfileDescriptor";
import VerifiedProfileRepository from "../../domain/repositories/VerifiedProfileRepository";
import VerifiedProfileUseCase from "../../domain/usecases/VerifiedProfileUseCase";

export default class VerifiedProfileUseCaseImpl
    implements VerifiedProfileUseCase {
    constructor(
        private readonly verifiedProfileRepository: VerifiedProfileRepository
    ) {
    }

    async getVerifiedProfile(verifiedProfileDescriptor: VCLVerifiedProfileDescriptor) {
        try {
            return await this.verifiedProfileRepository.getVerifiedProfile(verifiedProfileDescriptor);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
