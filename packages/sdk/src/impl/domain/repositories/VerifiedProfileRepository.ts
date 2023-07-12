import VCLResult from "../../../api/entities/VCLResult";
import VCLVerifiedProfile from "../../../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../../../api/entities/VCLVerifiedProfileDescriptor";

export default interface VerifiedProfileRepository {
    getVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
        completionBlock: (r: VCLResult<VCLVerifiedProfile>) => any
    ): void;
}
