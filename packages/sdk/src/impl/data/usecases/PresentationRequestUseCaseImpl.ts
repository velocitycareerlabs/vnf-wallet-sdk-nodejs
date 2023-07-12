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

    getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor,
        completionBlock: (r: VCLResult<VCLPresentationRequest>) => any
    ) {
        this.presentationRequestRepository.getPresentationRequest(
            presentationRequestDescriptor,
            (encodedJwtStrResult) => {
                encodedJwtStrResult.handleResult(
                    (encodedJwtStr) => {
                        this.onGetJwtSuccess(
                            encodedJwtStr,
                            presentationRequestDescriptor,
                            completionBlock
                        );
                    },
                    (error) => {
                        this.onError(error, completionBlock);
                    }
                );
            }
        );
    }

    onGetJwtSuccess(
        encodedJwtStr: string,
        presentationRequestDescriptor: VCLPresentationRequestDescriptor,
        completionBlock: (r: VCLResult<VCLPresentationRequest>) => any
    ) {
        try {
            this.jwtServiceRepository.decode(encodedJwtStr, (jwtResult) => {
                jwtResult.handleResult(
                    (jwt) =>
                        this.onDecodeJwtSuccess(
                            jwt,
                            presentationRequestDescriptor,
                            completionBlock
                        ),
                    (error) => this.onError(error, completionBlock)
                );
            });
        } catch (error: any) {
            this.onError(new VCLError(error), completionBlock);
        }
    }

    onDecodeJwtSuccess(
        jwt: VCLJwt,
        presentationRequestDescriptor: VCLPresentationRequestDescriptor,
        completionBlock: (r: VCLResult<VCLPresentationRequest>) => any
    ) {
        let keyID = jwt.header.keyID?.replace("#", encodeURIComponent("#"));
        if (!keyID) {
            this.onError(new VCLError("Empty KeyID"), completionBlock);
            return;
        }
        this.resolveKidRepository.getPublicKey(keyID, (publicKeyResult) => {
            publicKeyResult.handleResult(
                (publicKey) => {
                    this.onResolvePublicKeySuccess(
                        publicKey,
                        jwt,
                        presentationRequestDescriptor,
                        completionBlock
                    );
                },
                (error) => {
                    this.onError(error, completionBlock);
                }
            );
        });
    }

    onResolvePublicKeySuccess(
        jwkPublic: VCLJwkPublic,
        jwt: VCLJwt,
        presentationRequestDescriptor: VCLPresentationRequestDescriptor,
        completionBlock: (r: VCLResult<VCLPresentationRequest>) => any
    ) {
        let presentationRequest = new VCLPresentationRequest(
            jwt,
            jwkPublic,
            presentationRequestDescriptor.deepLink,
            presentationRequestDescriptor.pushDelegate
        );
        this.jwtServiceRepository.verifyJwt(
            presentationRequest.jwt,
            presentationRequest.jwkPublic,
            (isVerifiedResult) => {
                isVerifiedResult.handleResult(
                    (isVerified) =>
                        this.onVerificationSuccess(
                            isVerified,
                            presentationRequest,
                            completionBlock
                        ),
                    (error) => this.onError(error, completionBlock)
                );
            }
        );
    }

    onVerificationSuccess(
        isVerified: Boolean,
        presentationRequest: VCLPresentationRequest,
        completionBlock: (r: VCLResult<VCLPresentationRequest>) => any
    ) {
        if (isVerified) {
            completionBlock(new VCLResult.Success(presentationRequest));
        } else {
            this.onError(
                new VCLError(
                    "Failed  to verify: ${presentationRequest.jwt.payload}"
                ),
                completionBlock
            );
        }
    }

    onError(
        error: VCLError,
        completionBlock: (r: VCLResult<VCLPresentationRequest>) => any
    ) {
        completionBlock(new VCLResult.Error(error));
    }
}
