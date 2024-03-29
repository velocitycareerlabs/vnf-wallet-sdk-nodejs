import VCLPresentationSubmission from "./VCLPresentationSubmission";
import VCLSubmissionResult from "./VCLSubmissionResult";

export default class VCLExchangeDescriptor {
    constructor(
        public readonly presentationSubmission: VCLPresentationSubmission,
        public readonly submissionResult: VCLSubmissionResult
    ) {}

    get processUri() {
        return this.presentationSubmission.progressUri;
    }

    get did() {
        return this.presentationSubmission.iss;
    }

    get exchangeId() {
        return this.submissionResult.exchange.id;
    }

    get token() {
        return this.submissionResult.token;
    }

    static readonly KeyExchangeId = "exchange_id";
}
