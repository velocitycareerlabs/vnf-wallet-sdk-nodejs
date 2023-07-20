import VCLPresentationRequest from "./VCLPresentationRequest";
import VCLSubmission from "./VCLSubmission";
import VCLVerifiableCredential from "./VCLVerifiableCredential";

export default class VCLPresentationSubmission extends VCLSubmission {
    public readonly progressUri: string;
    constructor(
        presentationRequest: VCLPresentationRequest,
        verifiableCredentials: VCLVerifiableCredential[]
    ) {
        super(
            presentationRequest.submitPresentationUri,
            presentationRequest.iss,
            presentationRequest.exchangeId,
            presentationRequest.presentationDefinitionId,
            verifiableCredentials,
            presentationRequest.pushDelegate,
            presentationRequest.vendorOriginContext
        );

        this.progressUri = presentationRequest.progressUri;
    }
}
