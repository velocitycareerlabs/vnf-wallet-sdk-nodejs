import VCLJwt from "./VCLJwt";
import VCLVerifiedProfile from "./VCLVerifiedProfile";

export default class VCLCredentialManifest {
    constructor(
        public jwt: VCLJwt,
        public vendorOriginContext: string | null | undefined,
        public verifiedProfile: VCLVerifiedProfile
    ) {}

    get iss(): string {
        return this.jwt.payload[VCLCredentialManifest.KeyIss] ?? "";
    }

    get did(): string {
        return this.iss;
    }

    get exchangeId(): string {
        return this.jwt.payload[VCLCredentialManifest.KeyExchangeId] ?? "";
    }

    get presentationDefinitionId(): string {
        return (
            (this.jwt.payload[
                VCLCredentialManifest.KeyPresentationDefinitionId
            ] ?? {})[VCLCredentialManifest.KeyId] ?? ""
        );
    }

    get finalizeOffersUri(): string {
        return (
            (this.jwt.payload[VCLCredentialManifest.KeyMetadata] ?? {})[
                VCLCredentialManifest.KeyFinalizeOffersUri
            ] ?? ""
        );
    }

    get checkOffersUri(): string {
        return (
            (this.jwt.payload[VCLCredentialManifest.KeyMetadata] ?? {})[
                VCLCredentialManifest.KeyCheckOffersUri
            ] ?? ""
        );
    }

    get submitPresentationUri(): string {
        return (
            (this.jwt.payload[VCLCredentialManifest.KeyMetadata] ?? {})[
                VCLCredentialManifest.KeySubmitIdentificationUri
            ] ?? ""
        );
    }

    // CodingKeys
    static readonly KeyIssuingRequest: string = "issuing_request";
    static readonly KeyId: string = "id";
    static readonly KeyIss: string = "iss";
    static readonly KeyIssuer: string = "issuer";
    static readonly KeyExchangeId: string = "exchange_id";
    static readonly KeyPresentationDefinitionId: string =
        "presentation_definition";
    static readonly KeyMetadata: string = "metadata";
    static readonly KeyCheckOffersUri: string = "check_offers_uri";
    static readonly KeyFinalizeOffersUri: string = "finalize_offers_uri";
    static readonly KeySubmitIdentificationUri: string =
        "submit_presentation_uri";
}
