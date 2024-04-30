import VCLCredentialManifestDescriptor from "./VCLCredentialManifestDescriptor";
import VCLDeepLink from "./VCLDeepLink";
import VCLIssuingType from "./VCLIssuingType";
import VCLPushDelegate from "./VCLPushDelegate";

export default class VCLCredentialManifestDescriptorByDeepLink extends VCLCredentialManifestDescriptor {
    constructor(
        public deeplink: VCLDeepLink,
        public issuingType: VCLIssuingType = VCLIssuingType.Career,
        public readonly pushDelegate: VCLPushDelegate | null | undefined = null
    ) {
        super(
            deeplink.requestUri,
            issuingType,
            null,
            pushDelegate,
            deeplink.vendorOriginContext
        );
    }
}
