import VCLPlace from "./VCLPlace";

export default class VCLRegion extends VCLPlace {
    constructor(payload: JSONObject, code: string, name: string) {
        super(payload, code, name);
    }

    static readonly KeyCode = "code";
    static readonly KeyName = "name";
}
