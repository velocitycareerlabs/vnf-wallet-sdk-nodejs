import VCLServiceCredentialAgentIssuer from "./VCLServiceCredentialAgentIssuer";

export default class VCLOrganization {
    TAG = VCLOrganization.name;

    get serviceCredentialAgentIssuers(): VCLServiceCredentialAgentIssuer[] {
        return this.parseServiceCredentialAgentIssuers();
    }
    constructor(public readonly payload: JSONObject) {}

    private parseServiceCredentialAgentIssuers(): VCLServiceCredentialAgentIssuer[] {
        const result: VCLServiceCredentialAgentIssuer[] = [];

        try {
            const serviceJsonArr = (this.payload[VCLOrganization.KeyService] ??
                []) as JSONObject[];
            if (serviceJsonArr) {
                for (const i in serviceJsonArr) {
                    const it = serviceJsonArr[i];
                    if (it) {
                        result.push(new VCLServiceCredentialAgentIssuer(it));
                    }
                }
            }
        } catch (error) {
            // TODO: add log
            console.log("Error while parsing service credential agent issuers");
        }

        return result;
    }

    static readonly KeyService = "service";
}
