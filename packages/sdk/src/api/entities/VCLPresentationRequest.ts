import VCLDeepLink from "./VCLDeepLink";
import VCLJwkPublic from "./VCLJwkPublic";
import VCLJwt from "./VCLJwt";
import VCLPushDelegate from "./VCLPushDelegate";

export default class VCLPresentationRequest {
    constructor(
        public readonly jwt: VCLJwt,
        public readonly jwkPublic: VCLJwkPublic,
        public readonly deepLink: VCLDeepLink,
        public readonly pushDelegate: Nullish<VCLPushDelegate> = null
    ) {}

    get iss() {
        return (
            this.jwt.payload[VCLPresentationRequest.KeyIss]?.toString() ?? ""
        );
    }

    get exchangeId() {
        return (
            this.jwt.payload[
                VCLPresentationRequest.KeyExchangeId
            ]?.toString() ?? ""
        );
    }

    get presentationDefinitionId() {
        return (
            (this.jwt.payload[
                VCLPresentationRequest.KeyPresentationDefinition
            ] ?? {})[VCLPresentationRequest.KeyId] ?? ""
        );
    }

    get keyID() {
        return this.jwt.header.keyID ?? "";
    }

    get vendorOriginContext() {
        return this.deepLink.vendorOriginContext;
    }

    get progressUri() {
        return (
            (this.jwt.payload[VCLPresentationRequest.KeyMetadata] ?? {})[
                VCLPresentationRequest.KeyProgressUri
            ] ?? ""
        );
    }

    get submitPresentationUri() {
        return (
            (this.jwt.payload[VCLPresentationRequest.KeyMetadata] ?? {})[
                VCLPresentationRequest.KeySubmitPresentationUri
            ] ?? ""
        );
    }

    static readonly KeyId = "id";
    static readonly KeyIss = "iss";
    static readonly KeyExchangeId = "exchange_id";
    static readonly KeyPresentationRequest = "presentation_request";
    static readonly KeyPresentationDefinition = "presentation_definition";
    static readonly KeyMetadata = "metadata";
    static readonly KeyProgressUri = "progress_uri";
    static readonly KeySubmitPresentationUri = "submit_presentation_uri";
}
