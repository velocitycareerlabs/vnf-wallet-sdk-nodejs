import VCLCredentialManifestDescriptor from "./VCLCredentialManifestDescriptor";
import VCLIssuingType from "./VCLIssuingType";
import VCLPushDelegate from "./VCLPushDelegate";
import VCLService from "./VCLService";

export default class VCLCredentialManifestDescriptorByService extends VCLCredentialManifestDescriptor {
    constructor(
        public service: VCLService,
        public issuingType: VCLIssuingType = VCLIssuingType.Career,
        public credentialTypes: Nullish<string[]> = null,
        public pushDelegate: Nullish<VCLPushDelegate> = null
    ) {
        super(
            service.serviceEndpoint,
            issuingType,
            credentialTypes,
            pushDelegate
        );
    }

    get endpoint(): Nullish<string> {
        let params = this.generateQueryParams();
        if (!params) {
            return this.uri;
        }
        return this.uri?.appendQueryParams(params);
    }

    private generateQueryParams(): Nullish<string> {
        let pCredentialTypes: Nullish<string> = null;
        if (this.credentialTypes) {
            pCredentialTypes = `${
                VCLCredentialManifestDescriptor.KeyCredentialTypes
            }=${this.credentialTypes
                .map((it) => encodeURIComponent(it))
                .join("&")}`;
        }

        let pPushDelegate: Nullish<string> = null;
        if (this.pushDelegate) {
            pPushDelegate = `${
                VCLCredentialManifestDescriptor.KeyPushDelegatePushUrl
            }=${encodeURIComponent(this.pushDelegate.pushUrl)}&${
                VCLCredentialManifestDescriptor.KeyPushDelegatePushToken
            }=${this.pushDelegate.pushToken}`;
        }

        let qParams = [pCredentialTypes, pPushDelegate].filter(
            (it) => it && it !== ""
        );

        return qParams.length > 0 ? qParams.join("&") : null;
    }
}
