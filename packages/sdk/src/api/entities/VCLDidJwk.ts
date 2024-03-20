import { JWK, base64url, exportJWK } from "jose";
import VCLPublicJwk from "./VCLPublicJwk";
import { KeyObject, KeyPairKeyObjectResult } from "crypto";
import canonicalize from "canonicalize";

export default class VCLDidJwk {
    constructor(
        public readonly did: string,
        public readonly publicJwk: VCLPublicJwk,
        public readonly kid: string,
        public readonly keyId: string
    ) {}

    // companion object
    static readonly DidJwkPrefix = "did:jwk:";
    static readonly DidJwkSuffix = "#0";
    static readonly KeyDid = "did";
    static readonly KeyKid = "kid";
    static readonly KeyKeyId = "keyId";
    static Utils = class {
        static generateDidJwk = async (ecKey: KeyPairKeyObjectResult) => {
            const publicJwk = await exportJWK(ecKey.publicKey);
            return `${VCLDidJwk.DidJwkPrefix}${base64url.encode(
                canonicalize(publicJwk)!
            )}`;
        };

        static generateKidFromDidJwk = (ecKey: KeyPairKeyObjectResult) => {
            return `${this.generateDidJwk(ecKey)}${VCLDidJwk.DidJwkSuffix}`;
        };
    };
}
