import VCLService from "./VCLService";

export default class VCLServiceCredentialAgentIssuer extends VCLService {
    credentialTypes: string[] | null | undefined;
    constructor(public readonly payload: JSONObject) {
        super(payload);

        this.credentialTypes = payload[VCLService.KeyCredentialTypes];
    }
}
