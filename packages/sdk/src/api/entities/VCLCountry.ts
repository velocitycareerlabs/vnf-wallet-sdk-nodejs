import { Nullish } from "../../types";
import VCLPlace from "./VCLPlace";
import VCLRegions from "./VCLRegions";

export default class VCLCountry extends VCLPlace {
    constructor(
        public payload: JSONObject,
        public code: string,
        public name: string,
        public regions: Nullish<VCLRegions>
    ) {
        super(payload, code, name);
    }

    static KeyCode = "code";
    static KeyName = "name";
    static KeyRegions = "regions";
}
