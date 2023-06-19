enum Format {
    jwk = "jwk",
    hex = "hex",
    pem = "pem",
    base58 = "base58",
}

export default class VCLJwkPublic {
    constructor(public valueStr: string, public valueJson: JSONObject) {}
    static readonly Format = Format;

    fromString(valueStr: string) {
        this.valueStr = valueStr;
        this.valueJson = JSON.parse(valueStr);
    }

    fromJSON(valueJson: JSONObject) {
        this.valueJson = valueJson;
        this.valueStr = JSON.stringify(this.valueJson);
    }
}
