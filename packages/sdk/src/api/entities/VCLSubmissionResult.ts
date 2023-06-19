import VCLExchange from "./VCLExchange";
import VCLToken from "./VCLToken";

export default class VCLSubmissionResult {
    constructor(
        public readonly token: VCLToken,
        public readonly exchange: VCLExchange,
        public readonly jti: String,
        public readonly submissionId: String
    ) {}

    static readonly KeyToken = "token";
    static readonly KeyExchange = "exchange";
    static readonly KeyJti = "jti";
    static readonly KeySubmissionId = "submissionId";
}
