import VCLResult from "../../../api/entities/VCLResult";
import VCLCredentialManifestDescriptor from "../../../api/entities/VCLCredentialManifestDescriptor";

export default interface CredentialManifestRepository {
    getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        completionBlock: (r: VCLResult<string>) => any
    ): void;
}
