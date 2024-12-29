import { Dictionary } from "../VCLTypes";
import VCLService from "./VCLService";
import VCLLog from "../../impl/utils/VCLLog";

export default class VCLOrganization {
    TAG = VCLOrganization.name;

    get serviceCredentialAgentIssuers(): VCLService[] {
        return this.parseServiceCredentialAgentIssuers();
    }
    constructor(public readonly payload: Dictionary<any>) {}

    private parseServiceCredentialAgentIssuers(): VCLService[] {
        const result: VCLService[] = [];

        try {
            const serviceJsonArr = (this.payload[VCLOrganization.KeyService] ??
                []) as Dictionary<any>[];
            if (serviceJsonArr) {
                for (const i in serviceJsonArr) {
                    const it = serviceJsonArr[i];
                    if (it) {
                        result.push(new VCLService(it));
                    }
                }
            }
        } catch (error) {
            VCLLog.log("Error while parsing service credential agent issuers", error);
        }

        return result;
    }

    static readonly KeyService = "service";
}
