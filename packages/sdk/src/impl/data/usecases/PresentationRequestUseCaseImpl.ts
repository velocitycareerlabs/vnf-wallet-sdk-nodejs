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
import { Nullish } from "../../../api/VCLTypes";
import VCLToken from "../../../api/entities/VCLToken";

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
        const encodedJwtStrResult =
            await this.presentationRequestRepository.getPresentationRequest(
                presentationRequestDescriptor
            );

        const [error, encodedJwtStr] = await encodedJwtStrResult.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }
        try {
            const jwtResult = await this.jwtServiceRepository.decode(
                encodedJwtStr ?? ''
            );
            const [error, jwt] = await jwtResult.handleResult();
            if (error) {
                return this.onError(error);
            }
            return this.onGetPresentationRequestSuccess(
                new VCLPresentationRequest(
                    jwt as VCLJwt,
                    verifiedProfile,
                    presentationRequestDescriptor.deepLink,
                    presentationRequestDescriptor.pushDelegate,
                    presentationRequestDescriptor.didJwk,
                    presentationRequestDescriptor.remoteCryptoServicesToken
                ),
            );
        } catch (error: any) {
            return this.onError(new VCLError(error));
        }
    }

    async onGetPresentationRequestSuccess(
        presentationRequest: VCLPresentationRequest
    ): Promise<VCLResult<VCLPresentationRequest>> {
        const kid = presentationRequest.jwt.kid?.replace("#", encodeURIComponent("#"));
        if (!kid) {
            return this.onError(new VCLError("Empty kid"));
        }
        const publicJwkResult = await this.resolveKidRepository.getPublicKey(
            kid
        );

        const [error, publicJwk] = await publicJwkResult.handleResult();

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
        const isVerifiedResult = await this.jwtServiceRepository.verifyJwt(
            presentationRequest.jwt,
            publicJwk,
            presentationRequest.remoteCryptoServicesToken
        );
        const [error, isVerified] = await isVerifiedResult.handleResult();

        if (error) {
            return this.onError(error);
        }
        return this.onVerificationSuccess(isVerified!, presentationRequest);
    }

    async onVerificationSuccess(
        isVerified: boolean,
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
