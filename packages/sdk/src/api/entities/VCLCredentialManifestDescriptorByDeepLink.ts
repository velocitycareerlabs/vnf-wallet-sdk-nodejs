import VCLCredentialManifestDescriptor from "./VCLCredentialManifestDescriptor";
import VCLDeepLink from "./VCLDeepLink";
import VCLIssuingType from "./VCLIssuingType";

export default class VCLCredentialManifestDescriptorByDeepLink extends VCLCredentialManifestDescriptor {
    constructor(
        public deeplink: VCLDeepLink,
        public issuingType: VCLIssuingType = VCLIssuingType.Career
    ) {
        super(
            deeplink.requestUri,
            issuingType,
            null,
            null,
            deeplink.vendorOriginContext
        );
    }
}
