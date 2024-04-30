import VCLCredentialManifest from "./VCLCredentialManifest";
import VCLVerifiableCredential from "./VCLVerifiableCredential";

export default class VCLGenerateOffersDescriptor {
    constructor(
        public readonly credentialManifest: VCLCredentialManifest,
        public readonly types: string[] | null | undefined = null,
        public readonly offerHashes: string[] | null | undefined = null,
        public readonly identificationVerifiableCredentials: VCLVerifiableCredential[]
    ) {}

    payload: JSONObject = {
        [VCLGenerateOffersDescriptor.KeyExchangeId]: this.exchangeId,
        [VCLGenerateOffersDescriptor.KeyTypes]: this.types,
        [VCLGenerateOffersDescriptor.KeyOfferHashes]: this.offerHashes,
    };

    get exchangeId() {
        return this.credentialManifest.exchangeId;
    }

    get checkOffersUri() {
        return this.credentialManifest.checkOffersUri;
    }

    get did() {
        return this.credentialManifest.did;
    }

    static readonly KeyExchangeId = "exchangeId";
    static readonly KeyTypes = "types";
    static readonly KeyOfferHashes = "offerHashes";
}
