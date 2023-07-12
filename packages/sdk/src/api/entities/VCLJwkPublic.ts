enum Format {
    jwk = "jwk",
    hex = "hex",
    pem = "pem",
    base58 = "base58",
}

export default class VCLJwkPublic {
    constructor(public valueStr: string, public valueJson: JSONObject) {}
    static readonly Format = Format;

    public static fromString(valueStr: string) {
        return new VCLJwkPublic(valueStr, JSON.parse(valueStr));
    }

    public static fromJSON(valueJson: JSONObject) {
        return new VCLJwkPublic(JSON.stringify(valueJson), valueJson);
    }
}
