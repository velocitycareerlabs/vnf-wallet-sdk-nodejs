import VCLCredentialManifest from "./VCLCredentialManifest";
import VCLSubmission from "./VCLSubmission";
import VCLVerifiableCredential from "./VCLVerifiableCredential";
import { Nullish } from "../VCLTypes";
import VCLToken from "./VCLToken";
import VCLPushDelegate from "./VCLPushDelegate";

export default class VCLIdentificationSubmission extends VCLSubmission {
    constructor(
        public readonly credentialManifest: VCLCredentialManifest,
        public readonly verifiableCredentials: VCLVerifiableCredential[],
    ) {
        super(
            credentialManifest.submitPresentationUri,
            credentialManifest.iss,
            credentialManifest.exchangeId,
            credentialManifest.presentationDefinitionId,
            verifiableCredentials,
            null,
            credentialManifest.vendorOriginContext,
            credentialManifest.didJwk,
            credentialManifest.remoteCryptoServicesToken,
        );
    }
}
