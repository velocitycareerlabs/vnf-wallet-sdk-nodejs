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

export default class PresentationRequestUseCaseImpl
    implements PresentationRequestUseCase
{
    constructor(
        private presentationRequestRepository: PresentationRequestRepository,
        private resolveKidRepository: ResolveKidRepository,
        private jwtServiceRepository: JwtServiceRepository
    ) {}

    async getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<VCLPresentationRequest>> {
        const encodedJwtStrResult =
            await this.presentationRequestRepository.getPresentationRequest(
                presentationRequestDescriptor
            );

        const [error, encodedJwtStr] = await encodedJwtStrResult.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }
        return this.onGetJwtSuccess(
            encodedJwtStr!,
            presentationRequestDescriptor
        );
    }

    async onGetJwtSuccess(
        encodedJwtStr: string,
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<VCLPresentationRequest>> {
        try {
            const jwtResult = await this.jwtServiceRepository.decode(
                encodedJwtStr
            );
            const [error, jwt] = await jwtResult.handleResult();
            if (error) {
                return this.onError(error);
            }

            return this.onDecodeJwtSuccess(jwt!, presentationRequestDescriptor);
        } catch (error: any) {
            return this.onError(new VCLError(error));
        }
    }

    async onDecodeJwtSuccess(
        jwt: VCLJwt,
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<VCLPresentationRequest>> {
        const kid = jwt.kid?.replace("#", encodeURIComponent("#"));
        if (!kid) {
            return this.onError(new VCLError("Empty kid"));
        }
        const publicKeyResult = await this.resolveKidRepository.getPublicKey(
            kid
        );

        const [error, publicKey] = await publicKeyResult.handleResult();

        if (error) {
            return this.onError(error);
        }

        return this.onResolvePublicKeySuccess(
            publicKey!,
            jwt,
            presentationRequestDescriptor
        );
    }

    async onResolvePublicKeySuccess(
        jwkPublic: VCLPublicJwk,
        jwt: VCLJwt,
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<VCLPresentationRequest>> {
        const presentationRequest = new VCLPresentationRequest(
            jwt,
            jwkPublic,
            presentationRequestDescriptor.deepLink,
            presentationRequestDescriptor.pushDelegate
        );
        const isVerifiedResult = await this.jwtServiceRepository.verifyJwt(
            presentationRequest.jwt,
            presentationRequest.jwkPublic
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
