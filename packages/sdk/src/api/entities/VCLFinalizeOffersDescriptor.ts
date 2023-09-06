/*

data class VCLFinalizeOffersDescriptor(
    val credentialManifest: VCLCredentialManifest,
    val approvedOfferIds: List<String>,
    val rejectedOfferIds: List<String>
) {
    val payload: JSONObject =
        JSONObject()
            .putOpt(KeyExchangeId, exchangeId)
            .putOpt(KeyApprovedOfferIds, approvedOfferIds.toJsonArray())
            .putOpt(KeyRejectedOfferIds, rejectedOfferIds.toJsonArray())

    val did: String get() = credentialManifest.did
    val exchangeId: String get() = credentialManifest.exchangeId

    val finalizeOffersUri: String get() = credentialManifest.finalizeOffersUri

    companion object CodingKeys {
        const val KeyExchangeId = "exchangeId"
        const val KeyApprovedOfferIds = "approvedOfferIds"
        const val KeyRejectedOfferIds = "rejectedOfferIds"
    }
}
*/

import VCLCredentialManifest from "./VCLCredentialManifest";
import VCLJwt from "./VCLJwt";

export default class VCLFinalizeOffersDescriptor {
    constructor(
        public readonly credentialManifest: VCLCredentialManifest,
        public readonly approvedOfferIds: string[],
        public readonly rejectedOfferIds: string[]
    ) {}

    get exchangeId() {
        return this.credentialManifest.exchangeId;
    }

    get finalizeOffersUri() {
        return this.credentialManifest.finalizeOffersUri;
    }

    get did() {
        return this.credentialManifest.did;
    }

    payload: JSONObject = {
        [VCLFinalizeOffersDescriptor.KeyExchangeId]: this.exchangeId,
        [VCLFinalizeOffersDescriptor.KeyApprovedOfferIds]:
            this.approvedOfferIds,
        [VCLFinalizeOffersDescriptor.KeyRejectedOfferIds]:
            this.rejectedOfferIds,
    };

    generateRequestBody(jwt: VCLJwt): JSONObject {
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
