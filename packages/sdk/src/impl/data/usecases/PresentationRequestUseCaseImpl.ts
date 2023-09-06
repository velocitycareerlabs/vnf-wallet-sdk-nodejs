import VCLError from "../../../api/entities/VCLError";
import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
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
        let encodedJwtStrResult =
            await this.presentationRequestRepository.getPresentationRequest(
                presentationRequestDescriptor
            );

        let [error, encodedJwtStr] = await encodedJwtStrResult.handleResult();
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
            let jwtResult = await this.jwtServiceRepository.decode(
                encodedJwtStr
            );
            let [error, jwt] = await jwtResult.handleResult();
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
        let keyID = jwt.header.keyID?.replace("#", encodeURIComponent("#"));
        if (!keyID) {
            return this.onError(new VCLError("Empty KeyID"));
        }
        let publicKeyResult = await this.resolveKidRepository.getPublicKey(
            keyID
        );

        let [error, publicKey] = await publicKeyResult.handleResult();

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
        jwkPublic: VCLJwkPublic,
        jwt: VCLJwt,
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<VCLPresentationRequest>> {
        let presentationRequest = new VCLPresentationRequest(
            jwt,
            jwkPublic,
            presentationRequestDescriptor.deepLink,
            presentationRequestDescriptor.pushDelegate
        );
        let isVerifiedResult = await this.jwtServiceRepository.verifyJwt(
            presentationRequest.jwt,
            presentationRequest.jwkPublic
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
