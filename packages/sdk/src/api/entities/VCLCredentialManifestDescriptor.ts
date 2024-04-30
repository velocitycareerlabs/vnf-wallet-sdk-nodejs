import VCLIssuingType from "./VCLIssuingType";
import VCLPushDelegate from "./VCLPushDelegate";

export default class VCLCredentialManifestDescriptor {
    readonly did: string | null | undefined;

    constructor(
        public readonly uri: string | null | undefined = null,
        public readonly issuingType: VCLIssuingType = VCLIssuingType.Career,
        public readonly credentialTypes: string[] | null | undefined = null,
        public readonly pushDelegate: VCLPushDelegate | null | undefined = null,
        public readonly vendorOriginContext: string | null | undefined = null
    ) {
        this.did = uri?.getUrlSubPath(
            VCLCredentialManifestDescriptor.KeyDidPrefix
        );
    }

    get endpoint(): string | null | undefined {
        const params = this.generateQueryParams();
        if (!params) {
            return this.uri;
        }
        return this.uri?.appendQueryParams(params);
    }

    generateQueryParams(): string | null | undefined {
        let pCredentialTypes: string | null | undefined = null;
        if (this.credentialTypes) {
            pCredentialTypes = this.credentialTypes
                .map(
                    (it) =>
                        `${
                            VCLCredentialManifestDescriptor.KeyCredentialTypes
                        }=${encodeURIComponent(it)}`
                )
                .join("&");
        }

        let pPushDelegate: string | null | undefined = null;
        if (this.pushDelegate) {
            pPushDelegate = `${
                VCLCredentialManifestDescriptor.KeyPushDelegatePushUrl
            }=${encodeURIComponent(this.pushDelegate.pushUrl)}&${
                VCLCredentialManifestDescriptor.KeyPushDelegatePushToken
            }=${this.pushDelegate.pushToken}`;
        }

        const qParams = [pCredentialTypes, pPushDelegate].filter(
            (it) => it && it !== ""
        );

        return qParams.length > 0 ? qParams.join("&") : null;
    }

    static readonly KeyId = "id";
    static readonly KeyDidPrefix = "did:";
    static readonly KeyCredentialTypes = "credential_types";
    static readonly KeyPushDelegatePushUrl = "push_delegate.push_url";
    static readonly KeyPushDelegatePushToken = "push_delegate.push_token";
    static readonly KeyCredentialId = "credentialId";
    static readonly KeyRefresh = "refresh";
}
