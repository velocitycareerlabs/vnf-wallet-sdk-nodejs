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

    onVerificationSuccess(
        isVerified: boolean,
        jwt: VCLJwt,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        verifiedProfile: VCLVerifiedProfile
    ) {
        if (isVerified) {
            return new VCLResult.Success(
                new VCLCredentialManifest(
                    jwt,
                    credentialManifestDescriptor.vendorOriginContext,
                    verifiedProfile
                )
            );
        } else {
            return this.onError(new VCLError(`Failed to verify: ${jwt}`));
        }
    }

    onError(error: VCLError): VCLResult<VCLCredentialManifest> {
        return new VCLResult.Error(error);
    }

    async onGetJwtSuccess(
        jwtStr: string,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        verifiedProfile: VCLVerifiedProfile
    ): Promise<VCLResult<VCLCredentialManifest>> {
        const jwtResult = await this.jwtServiceRepository.decode(jwtStr);
        const [err, jwt] = await jwtResult.handleResult();

        if (err) {
            return this.onError(err);
        }

        return this.onDecodeJwtSuccess(
            jwt!,
            credentialManifestDescriptor,
            verifiedProfile
        );
    }

    async onResolvePublicKeySuccess(
        publicJwk: VCLPublicJwk,
        jwt: VCLJwt,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        verifiedProfile: VCLVerifiedProfile
    ): Promise<VCLResult<VCLCredentialManifest>> {
        const verificationResult = await this.jwtServiceRepository.verifyJwt(
            jwt,
            publicJwk
        );

        const [err, isVerified] = await verificationResult.handleResult();
        if (err) {
            return this.onError(err);
        }
        return this.onVerificationSuccess(
            isVerified!,
            jwt,
            credentialManifestDescriptor,
            verifiedProfile
        );
    }

    async onDecodeJwtSuccess(
        jwt: VCLJwt,
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        verifiedProfile: VCLVerifiedProfile
    ): Promise<VCLResult<VCLCredentialManifest>> {
        const kid = jwt.kid?.replace("#", encodeURIComponent("#"));
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
            jwt,
            credentialManifestDescriptor,
            verifiedProfile
        );
    }

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

        return this.onGetJwtSuccess(
            jwtStr!,
            credentialManifestDescriptor,
            verifiedProfile
        );
    }
}
