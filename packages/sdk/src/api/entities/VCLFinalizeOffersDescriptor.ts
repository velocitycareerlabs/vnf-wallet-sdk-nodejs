import { Dictionary } from "../VCLTypes";
import VCLCredentialManifest from "./VCLCredentialManifest";
import VCLJwt from "./VCLJwt";
import VCLOffers from "./VCLOffers";

export default class VCLFinalizeOffersDescriptor {
    constructor(
        public readonly credentialManifest: VCLCredentialManifest,
        public readonly offers: VCLOffers,
        public readonly approvedOfferIds: string[],
        public readonly rejectedOfferIds: string[]
    ) {
    }

    get exchangeId() {
        return this.credentialManifest.exchangeId;
    }

    get finalizeOffersUri() {
        return this.credentialManifest.finalizeOffersUri;
    }

    get did() {
        return this.credentialManifest.did;
    }

    payload: Dictionary<any> = {
        [VCLFinalizeOffersDescriptor.KeyExchangeId]: this.exchangeId,
        [VCLFinalizeOffersDescriptor.KeyApprovedOfferIds]: this.approvedOfferIds,
        [VCLFinalizeOffersDescriptor.KeyRejectedOfferIds]: this.rejectedOfferIds,
    };

    generateRequestBody(jwt: VCLJwt): Dictionary<any> {
        const retVal = this.payload;
        const proof: any = {};
        proof[VCLFinalizeOffersDescriptor.KeyProofType] =
            VCLFinalizeOffersDescriptor.KeyJwt;
        proof[VCLFinalizeOffersDescriptor.KeyJwt] = jwt.signedJwt.serialize();
        retVal[VCLFinalizeOffersDescriptor.KeyProof] = proof;
        return retVal;
    }

    static readonly KeyExchangeId = "exchangeId";
    static readonly KeyApprovedOfferIds = "approvedOfferIds";
    static readonly KeyRejectedOfferIds = "rejectedOfferIds";
    static readonly KeyJwt = "jwt";
    static readonly KeyProof = "proof";
    static readonly KeyProofType = "proof_type";
}
