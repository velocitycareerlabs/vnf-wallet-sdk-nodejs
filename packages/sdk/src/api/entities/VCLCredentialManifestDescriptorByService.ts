import { Nullish } from "../Nullish";
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
}
