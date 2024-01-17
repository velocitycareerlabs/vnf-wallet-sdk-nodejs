import { JWK, base64url } from "jose";

export default class VCLJwt {
    public encodedJwt: Nullish<string>;
    constructor(public signedJwt: SignedJWT) {
        this.signedJwt = signedJwt;
        this.encodedJwt = signedJwt.serialize();
    }

    static fromEncodedJwt(encodedJwt: string): VCLJwt {
        const encodedJwtArr = encodedJwt.split(".");
        let item = new VCLJwt(
            new SignedJWT(
                encodedJwtArr[0] || "",
                encodedJwtArr[1] || "",
                encodedJwtArr[2] || ""
            )
        );

        item.encodedJwt = encodedJwt;

        return item;
    }


    get kid(): string {
        return (this.header.kid || this.jwk.kid) || ""
    }

    get jwk(): JSONObject {
        return this.header.jwk || JSON.parse("{}")
    }

    get header(): JSONObject {
        const buff = Buffer.from(this.signedJwt.header, "base64");
        const text = buff.toString("utf-8");
        return JSON.parse(text || "{}");
    }

    get payload(): JSONObject {
        const buff = Buffer.from(this.signedJwt.payload, "base64");
        const text = buff.toString("utf-8");
        return JSON.parse(text || "{}");
    }

    get signature(): string {
        return this.signedJwt.signature;
    }
}

// TODO: implement
export class SignedJWT {
    constructor(
        public readonly header: string,
        public readonly payload: string,
        public readonly signature: string
    ) {}

    static parse(s: string): Nullish<SignedJWT> {
        let splitted = s.split(".");
        return new SignedJWT(
            splitted[0] ?? "",
            splitted[1] ?? "",
            splitted[2] ?? ""
        );
    }

    serialize() {
        let items = [this.header, this.payload, this.signature].filter(
            (item) => item.length
        );
        return items.join(".");
    }
}
