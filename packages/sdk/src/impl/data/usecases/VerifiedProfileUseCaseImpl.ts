import VCLResult from "../../../api/entities/VCLResult";
import VCLVerifiedProfile from "../../../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../../../api/entities/VCLVerifiedProfileDescriptor";
import VerifiedProfileRepository from "../../domain/repositories/VerifiedProfileRepository";
import VerifiedProfileUseCase from "../../domain/usecases/VerifiedProfileUseCase";

export default class VerifiedProfileUseCaseImpl
    implements VerifiedProfileUseCase
{
    constructor(
        private readonly verifiedProfileRepository: VerifiedProfileRepository
    ) {}

    getVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
        completionBlock: (a: VCLResult<VCLVerifiedProfile>) => any
    ): void {
        this.verifiedProfileRepository.getVerifiedProfile(
            verifiedProfileDescriptor,
            completionBlock
        );
    }
}
