export default class VCLService {
    id: string;
    type: string;
    serviceEndpoint: string;
    constructor(public payload: JSONObject) {
        this.id = payload[VCLService.KeyId];
        this.type = payload[VCLService.KeyType];
        this.serviceEndpoint = payload[VCLService.KeyServiceEndpoint];
    }

    static readonly KeyId = "id";
    static readonly KeyType = "type";
    static readonly KeyCredentialTypes = "credentialTypes";
    static readonly KeyServiceEndpoint = "serviceEndpoint";
}
