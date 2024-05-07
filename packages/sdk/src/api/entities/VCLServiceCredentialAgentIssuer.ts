import { Dictionary, Nullish } from "../VCLTypes";
import VCLService from "./VCLService";

export default class VCLServiceCredentialAgentIssuer extends VCLService {
    credentialTypes: Nullish<string[]>;
    constructor(public readonly payload: Dictionary<any>) {
        super(payload);

        this.credentialTypes = payload[VCLService.KeyCredentialTypes];
    }
}
