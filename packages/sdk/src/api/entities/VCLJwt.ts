import { Dictionary, Nullish } from "../VCLTypes";
import VCLLog from "../../impl/utils/VCLLog";

export default class VCLJwt {
    public encodedJwt: Nullish<string>;
    constructor(public signedJwt: SignedJWT) {
        this.signedJwt = signedJwt;
        this.encodedJwt = signedJwt.serialize();
    }

    static fromEncodedJwt(encodedJwt: string): VCLJwt {
        let item = new VCLJwt(new SignedJWT("", "", ""));
        try {
            const encodedJwtArr = encodedJwt.split(".");
            item = new VCLJwt(
                new SignedJWT(
                    encodedJwtArr[0] || "",
                    encodedJwtArr[1] || "",
                    encodedJwtArr[2] || ""
                )
            );
        } catch (e) {
            VCLLog.e("VCLJwt", JSON.stringify(e));
        }
        return item;
    }


    get kid(): string {
        return (this.header.kid || this.jwk.kid) || ""
    }

    get jwk(): Dictionary<any> {
        return this.header.jwk || {}
    }

    get header(): Dictionary<any> {
        const buff = Buffer.from(this.signedJwt.header, "base64");
        const text = buff.toString("utf-8");
        return JSON.parse(text || "{}");
    }

    get payload(): Dictionary<any> {
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
        const splitted = s.split(".");
        return new SignedJWT(
            splitted[0] ?? "",
            splitted[1] ?? "",
            splitted[2] ?? ""
        );
    }

    serialize() {
        const items = [this.header, this.payload, this.signature].filter(
            (item) => item.length
        );
        return items.join(".");
    }
}
