import VCLService from "./VCLService";

export default class VCLServiceCredentialAgentIssuer extends VCLService {
    credentialTypes: Nullish<string[]>;
    constructor(public readonly payload: JSONObject) {
        super(payload);

        this.credentialTypes = payload[VCLService.KeyCredentialTypes];
    }
}
