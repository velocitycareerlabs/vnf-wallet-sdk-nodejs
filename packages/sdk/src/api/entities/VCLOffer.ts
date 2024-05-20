import { Dictionary } from "../VCLTypes";

export class VCLOffer {
    payload: Dictionary<any>;

    constructor(payload: Dictionary<any>) {
        this.payload = payload;
    }

    get issuerId(): string {
        const issuerObject = this.payload ? this.payload[VCLOffer.CodingKeys.KeyIssuer] : null;
        return issuerObject && issuerObject[VCLOffer.CodingKeys.KeyId]
            ? issuerObject[VCLOffer.CodingKeys.KeyId]
            : this.payload ? this.payload[VCLOffer.CodingKeys.KeyIssuer] || "" : "";
    }

    get id(): string {
        return this.payload ? this.payload[VCLOffer.CodingKeys.KeyId] || "" : "";
    }

    static CodingKeys = class {
        static readonly KeyId: string = "id";
        static readonly KeyDid: string = "did";
        static readonly KeyIssuer: string = "issuer";
    }
}
