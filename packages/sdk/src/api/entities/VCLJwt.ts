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

    get header(): JSONObject {
        let buff = Buffer.from(this.signedJwt.header, "base64");
        let text = buff.toString("ascii");
        return JSON.parse(text);
    }

    get payload(): JSONObject {
        let buff = Buffer.from(this.signedJwt.payload, "base64");
        let text = buff.toString("ascii");
        return JSON.parse(text);
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
        if (splitted.length !== 3) {
            return null;
        }
        return new SignedJWT(splitted[0], splitted[1], splitted[2]);
    }

    serialize() {
        return `${this.header}.${this.payload}.${this.signature}`;
    }
}
