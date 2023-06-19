import { base64url } from "jose";

export default class VCLJwt {
    constructor(public signedJwt: SignedJWT) {
        this.signedJwt = signedJwt;
    }

    static fromEncodedJwt(encodedJwt: string): VCLJwt {
        const encodedJwtArr = encodedJwt.split(".");
        return new VCLJwt(
            new SignedJWT(
                encodedJwtArr[0] || "",
                encodedJwtArr[1] || "",
                encodedJwtArr[2] || ""
            )
        );
    }

    get header(): JSONObject {
        return this.signedJwt.header;
    }

    get payload(): JSONObject {
        return this.signedJwt.payload;
    }

    get signature(): string {
        return this.signedJwt.signature;
    }
}

// TODO: implement
class SignedJWT {
    constructor(
        public readonly header: string,
        public readonly payload: string,
        public readonly signature: string
    ) {}

    serialize() {
        return "";
    }
}
