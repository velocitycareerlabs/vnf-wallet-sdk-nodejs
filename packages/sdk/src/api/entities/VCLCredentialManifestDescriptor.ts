import VCLIssuingType from "./VCLIssuingType";
import VCLPushDelegate from "./VCLPushDelegate";

export default class VCLCredentialManifestDescriptor {
    readonly did: Nullish<string>;
    get endpoint(): Nullish<string> {
        return this.uri;
    }

    constructor(
        public readonly uri: Nullish<string> = null,
        public readonly issuingType: VCLIssuingType = VCLIssuingType.Career,
        public readonly credentialTypes: Nullish<string[]> = null,
        public readonly pushDelegate: Nullish<VCLPushDelegate> = null,
        public readonly vendorOriginContext: Nullish<string> = null
    ) {
        this.did = uri?.getUrlSubPath(
            VCLCredentialManifestDescriptor.KeyDidPrefix
        );
    }

    static readonly KeyId = "id";
    static readonly KeyDidPrefix = "did:";
    static readonly KeyCredentialTypes = "credential_types";
    static readonly KeyPushDelegatePushUrl = "push_delegate.push_url";
    static readonly KeyPushDelegatePushToken = "push_delegate.push_token";
    static readonly KeyCredentialId = "credentialId";
    static readonly KeyRefresh = "refresh";
}
