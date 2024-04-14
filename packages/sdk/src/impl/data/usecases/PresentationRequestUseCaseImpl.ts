import VCLError from "../../../api/entities/error/VCLError";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLPresentationRequest from "../../../api/entities/VCLPresentationRequest";
import VCLPresentationRequestDescriptor from "../../../api/entities/VCLPresentationRequestDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import PresentationRequestRepository from "../../domain/repositories/PresentationRequestRepository";
import ResolveKidRepository from "../../domain/repositories/ResolveKidRepository";
import PresentationRequestUseCase from "../../domain/usecases/PresentationRequestUseCase";
import VCLVerifiedProfile from "../../../api/entities/VCLVerifiedProfile";

export default class PresentationRequestUseCaseImpl
    implements PresentationRequestUseCase
{
    constructor(
        private presentationRequestRepository: PresentationRequestRepository,
        private resolveKidRepository: ResolveKidRepository,
        private jwtServiceRepository: JwtServiceRepository
    ) {}

    async getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor,
        verifiedProfile: VCLVerifiedProfile
    ): Promise<VCLResult<VCLPresentationRequest>> {
        let encodedJwtStrResult =
            await this.presentationRequestRepository.getPresentationRequest(
                presentationRequestDescriptor
            );

        let [error, encodedJwtStr] = await encodedJwtStrResult.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }
        try {
            let jwtResult = await this.jwtServiceRepository.decode(
                encodedJwtStr ?? ''
            );
            let [error, jwt] = await jwtResult.handleResult();
            if (error) {
                return this.onError(error);
            }
            return this.onGetPresentationRequestSuccess(
                new VCLPresentationRequest(
                    jwt as VCLJwt,
                    verifiedProfile,
                    presentationRequestDescriptor.deepLink,
                    presentationRequestDescriptor.pushDelegate
                )
            );
        } catch (error: any) {
            return this.onError(new VCLError(error));
        }
    }

    async onGetPresentationRequestSuccess(
        presentationRequest: VCLPresentationRequest
    ): Promise<VCLResult<VCLPresentationRequest>> {
        let kid = presentationRequest.jwt.kid?.replace("#", encodeURIComponent("#"));
        if (!kid) {
            return this.onError(new VCLError("Empty kid"));
        }
        let publicJwkResult = await this.resolveKidRepository.getPublicKey(
            kid
        );

        let [error, publicJwk] = await publicJwkResult.handleResult();

        if (error) {
            return this.onError(error);
        }

        return this.onResolvePublicKeySuccess(
            publicJwk as VCLPublicJwk,
            presentationRequest
        );
    }

    async onResolvePublicKeySuccess(
        publicJwk: VCLPublicJwk,
        presentationRequest: VCLPresentationRequest
    ): Promise<VCLResult<VCLPresentationRequest>> {
        let isVerifiedResult = await this.jwtServiceRepository.verifyJwt(
            presentationRequest.jwt,
            publicJwk
        );
        let [error, isVerified] = await isVerifiedResult.handleResult();

        if (error) {
            return this.onError(error);
        }
        return this.onVerificationSuccess(isVerified!, presentationRequest);
    }

    async onVerificationSuccess(
        isVerified: Boolean,
        presentationRequest: VCLPresentationRequest
    ): Promise<VCLResult<VCLPresentationRequest>> {
        if (isVerified) {
            return new VCLResult.Success(presentationRequest);
        } else {
            return this.onError(
                new VCLError(
                    `Failed  to verify: ${presentationRequest.jwt.payload}`
                )
            );
        }
    }

    onError(error: VCLError): VCLResult<any> {
        return new VCLResult.Error(error);
    }
}
