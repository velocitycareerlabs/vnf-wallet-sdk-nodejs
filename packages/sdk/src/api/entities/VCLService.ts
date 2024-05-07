import { Dictionary } from "../VCLTypes";

export default class VCLService {
    id: string;
    type: string;
    serviceEndpoint: string;
    constructor(public payload: Dictionary<any>) {
        this.id = payload[VCLService.KeyId];
        this.type = payload[VCLService.KeyType];
        this.serviceEndpoint = payload[VCLService.KeyServiceEndpoint];
    }

    static readonly KeyId = "id";
    static readonly KeyType = "type";
    static readonly KeyCredentialTypes = "credentialTypes";
    static readonly KeyServiceEndpoint = "serviceEndpoint";
}
