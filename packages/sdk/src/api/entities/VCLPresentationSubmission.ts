import VCLPresentationRequest from "./VCLPresentationRequest";
import VCLSubmission from "./VCLSubmission";
import VCLVerifiableCredential from "./VCLVerifiableCredential";
import { Nullish } from "../VCLTypes";
import VCLToken from "./VCLToken";

export default class VCLPresentationSubmission extends VCLSubmission {
    public readonly progressUri: string;
    constructor(
        presentationRequest: VCLPresentationRequest,
        verifiableCredentials: VCLVerifiableCredential[],
        remoteCryptoServicesToken: Nullish<VCLToken>

    ) {
        super(
            presentationRequest.submitPresentationUri,
            presentationRequest.iss,
            presentationRequest.exchangeId,
            presentationRequest.presentationDefinitionId,
            verifiableCredentials,
            presentationRequest.pushDelegate,
            presentationRequest.vendorOriginContext,
            remoteCryptoServicesToken
        );

        this.progressUri = presentationRequest.progressUri;
    }
}
