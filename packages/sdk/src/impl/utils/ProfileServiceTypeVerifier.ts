import VCLError from "../../api/entities/VCLError";
import VCLResult from "../../api/entities/VCLResult";
import VCLServiceTypes from "../../api/entities/VCLServiceTypes";
import VCLStatusCode from "../../api/entities/VCLStatusCode";
import VCLVerifiedProfile from "../../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../../api/entities/VCLVerifiedProfileDescriptor";
import VerifiedProfileUseCase from "../domain/usecases/VerifiedProfileUseCase";

export class ProfileServiceTypeVerifier {
    constructor(
        private readonly verifiedProfileUseCase: VerifiedProfileUseCase
    ) {}

    async verifyServiceTypeOfVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
        expectedServiceTypes: VCLServiceTypes
    ): Promise<VCLResult<any>> {
        let verifiedProfileResult =
            await this.verifiedProfileUseCase.getVerifiedProfile(
                verifiedProfileDescriptor
            );
        let [err, verifiedProfile] = await verifiedProfileResult.handleResult();

        if (err) {
            throw err;
        }

        let isVerified = await this.verifyServiceType(
            verifiedProfile!,
            expectedServiceTypes
        );
        return new VCLResult.Success(isVerified);
    }

    async verifyServiceType(
        verifiedProfile: VCLVerifiedProfile,
        expectedServiceTypes: VCLServiceTypes
    ): Promise<boolean> {
        if (
            verifiedProfile.serviceTypes.containsAtLeastOneOf(
                expectedServiceTypes
            )
        ) {
            return true;
        } else {
            throw new VCLError(
                JSON.stringify({
                    profileName: verifiedProfile.name,
                    message: `Wrong service type - expected: ${expectedServiceTypes.all}, found: ${verifiedProfile.serviceTypes.all}`,
                }),
                null,
                null,
                VCLStatusCode.VerificationError
            );
        }
    }
}
