import VCLCredentialManifest from "../../../api/entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "../../../api/entities/VCLCredentialManifestDescriptor";
import VCLError from "../../../api/entities/error/VCLError";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLResult from "../../../api/entities/VCLResult";
import CredentialManifestRepository from "../../domain/repositories/CredentialManifestRepository";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import ResolveKidRepository from "../../domain/repositories/ResolveKidRepository";
import CredentialManifestUseCase from "../../domain/usecases/CredentialManifestUseCase";
import VCLVerifiedProfile from "../../../api/entities/VCLVerifiedProfile";

export default class CredentialManifestUseCaseImpl
    implements CredentialManifestUseCase
{
    constructor(
        private readonly credentialManifestRepository: CredentialManifestRepository,
        private readonly resolveKidRepository: ResolveKidRepository,
        private readonly jwtServiceRepository: JwtServiceRepository
    ) {}

    async getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        verifiedProfile: VCLVerifiedProfile
    ): Promise<VCLResult<VCLCredentialManifest>> {
        const jwtStrResult =
            await this.credentialManifestRepository.getCredentialManifest(
                credentialManifestDescriptor
            );
        const [error, jwtStr] = await jwtStrResult.handleResult();
        if (error) {
            return this.onError(error);
        }

        return this.onGetCredentialManifestSuccess(
            new VCLCredentialManifest(
                VCLJwt.fromEncodedJwt(jwtStr!),
                credentialManifestDescriptor.vendorOriginContext,
                verifiedProfile,
                credentialManifestDescriptor.deepLink,
                credentialManifestDescriptor.didJwk,
                credentialManifestDescriptor.remoteCryptoServicesToken
            )
        );
    }

    async onGetCredentialManifestSuccess(
        credentialManifest: VCLCredentialManifest
    ): Promise<VCLResult<VCLCredentialManifest>> {
        // TODO: Here we should verify the credential manifest in future
        // credentialManifestByDeepLinkVerifier.verifyCredentialManifest(credentialManifest, deepLink) {
        return this.onCredentialManifestDidVerificationSuccess(credentialManifest);
    }

    async onCredentialManifestDidVerificationSuccess(
        credentialManifest: VCLCredentialManifest
    ): Promise<VCLResult<VCLCredentialManifest>> {
        const kid = credentialManifest.jwt.kid?.replace("#", encodeURIComponent("#"));
        if (!kid) {
            return this.onError(new VCLError("Empty kid"));
        }
        const publicKeyResult = await this.resolveKidRepository.getPublicKey(kid);

        const [err, publicKey] = await publicKeyResult.handleResult();
        if (err) {
            this.onError(err);
        }
        return this.onResolvePublicKeySuccess(
            publicKey!,
            credentialManifest,
        );
    }

    async onResolvePublicKeySuccess(
        publicJwk: VCLPublicJwk,
        credentialManifest: VCLCredentialManifest,
    ): Promise<VCLResult<VCLCredentialManifest>> {
        const verificationResult = await this.jwtServiceRepository.verifyJwt(
            credentialManifest.jwt,
            publicJwk,
            credentialManifest.remoteCryptoServicesToken
        );

        const [err, isVerified] = await verificationResult.handleResult();
        if (err) {
            return this.onError(err);
        }
        return this.onVerificationSuccess(
            isVerified!,
            credentialManifest
        );
    }

    async onVerificationSuccess(
        isVerified: boolean,
        credentialManifest: VCLCredentialManifest,
    ): Promise<VCLResult<VCLCredentialManifest>> {
        if (isVerified) {
            return new VCLResult.Success(credentialManifest);
        } else {
            return this.onError(
                new VCLError(`Failed to verify credentialManifest jwt:\n${credentialManifest.jwt}`),
            )
        }
    }

    onError(error: VCLError): VCLResult<VCLCredentialManifest> {
        return new VCLResult.Error(error);
    }
}
