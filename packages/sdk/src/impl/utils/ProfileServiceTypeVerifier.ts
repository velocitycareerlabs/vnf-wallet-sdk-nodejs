import VCLError from "../../api/entities/VCLError";
import VCLServiceTypes from "../../api/entities/VCLServiceTypes";
import VCLStatusCode from "../../api/entities/VCLStatusCode";
import VCLVerifiedProfile from "../../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../../api/entities/VCLVerifiedProfileDescriptor";
import VerifiedProfileUseCase from "../domain/usecases/VerifiedProfileUseCase";

export class ProfileServiceTypeVerifier {
    constructor(
        private readonly verifiedProfileUseCase: VerifiedProfileUseCase
    ) {}

    verifyServiceTypeOfVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
        expectedServiceTypes: VCLServiceTypes,
        successHandler: () => any,
        errorHandler: (e: VCLError) => any
    ): void {
        this.verifiedProfileUseCase.getVerifiedProfile(
            verifiedProfileDescriptor,
            (verifiedProfileResult) => {
                verifiedProfileResult.handleResult(
                    (verifiedProfile) => {
                        this.verifyServiceType(
                            verifiedProfile,
                            expectedServiceTypes,
                            successHandler,
                            errorHandler
                        );
                    },
                    () => {}
                );
            }
        );
    }

    verifyServiceType(
        verifiedProfile: VCLVerifiedProfile,
        expectedServiceTypes: VCLServiceTypes,
        successHandler: () => any,
        errorHandler: (e: VCLError) => any
    ) {
        if (
            verifiedProfile.serviceTypes.containsAtLeastOneOf(
                expectedServiceTypes
            )
        ) {
            successHandler();
        } else {
            errorHandler(
                new VCLError(
                    JSON.stringify({
                        profileName: verifiedProfile.name,
                        message: `Wrong service type - expected: ${expectedServiceTypes.all}, found: ${verifiedProfile.serviceTypes.all}`,
                    }),
                    null,
                    null,
                    VCLStatusCode.VerificationError
                )
            );
        }
    }
}
