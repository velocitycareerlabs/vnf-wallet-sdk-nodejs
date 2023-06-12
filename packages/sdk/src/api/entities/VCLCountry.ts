import VCLPlace from "./VCLPlace";

export default class VCLCountry extends VCLPlace {
    constructor(
        public payload: JSONObject,
        public code: string,
        public name: string
    ) {
        super(payload, code, name);
    }

    static KeyCode = "code";
    static KeyName = "name";
    static KeyRegions = "regions";
}
