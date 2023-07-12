import VCLCredentialManifest from "../../../api/entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "../../../api/entities/VCLCredentialManifestDescriptor";
import VCLError from "../../../api/entities/VCLError";
import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLResult from "../../../api/entities/VCLResult";
import CredentialManifestRepository from "../../domain/repositories/CredentialManifestRepository";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import ResolveKidRepository from "../../domain/repositories/ResolveKidRepository";
import CredentialManifestUseCase from "../../domain/usecases/CredentialManifestUseCase";

export default class CredentialManifestUseCaseImpl
    implements CredentialManifestUseCase
{
    constructor(
        private readonly credentialManifestRepository: CredentialManifestRepository,
        private readonly resolveKidRepository: ResolveKidRepository,
        private readonly jwtServiceRepository: JwtServiceRepository
    ) {}

    onVerificationSuccess(
        isVerified: Boolean,
        jwt: VCLJwt,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        completionBlock: (r: VCLResult<VCLCredentialManifest>) => any
    ) {
        if (isVerified) {
            completionBlock(
                new VCLResult.Success(
                    new VCLCredentialManifest(
                        jwt,
                        credentialManifestDescriptor.vendorOriginContext
                    )
                )
            );
        } else {
            this.onError(
                new VCLError("Failed to verify: $jwt"),
                completionBlock
            );
        }
    }

    onError(
        error: VCLError,
        completionBlock: (r: VCLResult<VCLCredentialManifest>) => any
    ) {
        completionBlock(new VCLResult.Error(error));
    }

    onGetJwtSuccess(
        jwtStr: string,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        completionBlock: (r: VCLResult<VCLCredentialManifest>) => any
    ): void {
        this.jwtServiceRepository.decode(jwtStr, (jwtResult) => {
            jwtResult.handleResult(
                (jwt) =>
                    this.onDecodeJwtSuccess(
                        jwt,
                        credentialManifestDescriptor,
                        completionBlock
                    ),
                (error) => this.onError(error, completionBlock)
            );
        });
    }

    onResolvePublicKeySuccess(
        jwkPublic: VCLJwkPublic,
        jwt: VCLJwt,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        completionBlock: (r: VCLResult<VCLCredentialManifest>) => any
    ) {
        this.jwtServiceRepository.verifyJwt(
            jwt,
            jwkPublic,
            (verificationResult) =>
                verificationResult.handleResult(
                    (isVerified) =>
                        this.onVerificationSuccess(
                            isVerified,
                            jwt,
                            credentialManifestDescriptor,
                            completionBlock
                        ),
                    (error: VCLError) => this.onError(error, completionBlock)
                )
        );
    }

    onDecodeJwtSuccess(
        jwt: VCLJwt,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        completionBlock: (r: VCLResult<VCLCredentialManifest>) => any
    ) {
        const keyID = jwt.header.keyID?.replace("#", encodeURIComponent("#"));
        if (!keyID) {
            this.onError(new VCLError("Empty KeyID"), completionBlock);
            return;
        }
        this.resolveKidRepository.getPublicKey(keyID, (publicKeyResult) => {
            publicKeyResult.handleResult(
                (publicKey) =>
                    this.onResolvePublicKeySuccess(
                        publicKey,
                        jwt,
                        credentialManifestDescriptor,
                        completionBlock
                    ),
                (error) => this.onError(error, completionBlock)
            );
        });
    }

    getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        completionBlock: (r: VCLResult<VCLCredentialManifest>) => any
    ) {
        this.credentialManifestRepository.getCredentialManifest(
            credentialManifestDescriptor,
            (jwtStrResult) => {
                jwtStrResult.handleResult(
                    (jwtStr) =>
                        this.onGetJwtSuccess(
                            jwtStr,
                            credentialManifestDescriptor,
                            completionBlock
                        ),
                    (error) => this.onError(error, completionBlock)
                );
            }
        );
    }
}
