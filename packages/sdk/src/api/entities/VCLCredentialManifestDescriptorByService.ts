import VCLCredentialManifestDescriptor from "./VCLCredentialManifestDescriptor";
import VCLIssuingType from "./VCLIssuingType";
import VCLPushDelegate from "./VCLPushDelegate";
import VCLService from "./VCLService";

export default class VCLCredentialManifestDescriptorByService extends VCLCredentialManifestDescriptor {
    constructor(
        public service: VCLService,
        public issuingType: VCLIssuingType = VCLIssuingType.Career,
        public credentialTypes: string[] | null | undefined = null,
        public pushDelegate: VCLPushDelegate | null | undefined = null
    ) {
        super(
            service.serviceEndpoint,
            issuingType,
            credentialTypes,
            pushDelegate
        );
    }
}
