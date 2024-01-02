import { KeyPairKeyObjectResult } from "crypto";
import VCLJwt, { SignedJWT } from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import VCLJwtSignService from "../../../api/jwt/VCLJwtSignService";
import VCLKeyService from "../../../api/keys/VCLKeyService";
import { SignJWT } from "jose";

export default class VCLJwtSignServiceLocalImpl implements VCLJwtSignService {
    constructor(private readonly keyService: VCLKeyService) {}

    private getSecretReference(
        keyId: Nullish<string>
    ): Promise<VCLResult<KeyPairKeyObjectResult>> {
        if (keyId) {
            return this.keyService.retrieveSecretReference(keyId);
        }
        return this.keyService.generateSecret();
    }

    async sign(
        kid: Nullish<string>,
        nonce: Nullish<string>,
        jwtDescriptor: VCLJwtDescriptor,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<VCLJwt>> {
        let ecKeyResult = await this.getSecretReference(jwtDescriptor.keyId);
        const [err, ecKey] = ecKeyResult.handleResult();
        if (err) return new VCLResult.Error(err);

        const header: any = {
            alg: "ES256K",
            typ: "JWT",
        };
        if (kid) {
            header["kid"] = kid;
        } else {
            header["jwk"] = ecKey?.publicKey;
        }

        let signedJwtRes = new SignJWT(jwtDescriptor.payload)
            .setProtectedHeader(header)
            .setAudience(jwtDescriptor.iss)
            .setIssuer(jwtDescriptor.iss)
            .setJti(jwtDescriptor.jti)
            .setIssuedAt(Math.floor(Date.now() / 1000))
            .setNotBefore(Math.floor(Date.now() / 1000))
            .setExpirationTime("7d")
            .setSubject("".randomString(10));

        if (nonce) {
            signedJwtRes["_payload"][VCLJwtSignServiceLocalImpl.KeyNonce] =
                nonce;
        }

        let result: string = "";
        try {
            result = await signedJwtRes.sign(ecKey!.privateKey);
        } catch (error) {
            console.log(error);
            return new VCLResult.Error(error as any);
        }

        return new VCLResult.Success(new VCLJwt(SignedJWT.parse(result)!));
    }
    static readonly KeyIss = "iss";
    static readonly KeyAud = "aud";
    static readonly KeySub = "sub";
    static readonly KeyJti = "jti";
    static readonly KeyIat = "iat";
    static readonly KeyNbf = "nbf";
    static readonly KeyExp = "exp";
    static readonly KeyNonce = "nonce";
}
