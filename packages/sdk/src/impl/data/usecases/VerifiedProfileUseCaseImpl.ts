import VCLResult from "../../../api/entities/VCLResult";
import VCLVerifiedProfile from "../../../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../../../api/entities/VCLVerifiedProfileDescriptor";
import VerifiedProfileUseCase from "../../domain/usecases/VerifiedProfileUseCase";

export default class VerifiedProfileUseCaseImpl
    implements VerifiedProfileUseCase
{
    getVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
        completionBlock: (a: VCLResult<VCLVerifiedProfile>) => any
    ): void {
        throw new Error("Method not implemented.");
    }
}
