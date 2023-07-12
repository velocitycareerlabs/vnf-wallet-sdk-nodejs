import {
    jwtVerify,
    calculateJwkThumbprint,
    base64url,
    JWK,
    generateKeyPair,
    exportJWK,
    SignJWT,
    GeneralSign,
} from "jose";

import util from "util";
import VCLDidJwk from "../../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../../api/entities/VCLDidJwkDescriptor";
import VCLJwt, { SignedJWT } from "../../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../../api/entities/VCLJwtDescriptor";
import JwtService from "../../../domain/infrastructure/jwt/JwtService";
import crypto from "crypto";
import canonicalize from "canonicalize";
import VCLJwkPublic from "../../../../api/entities/VCLJwkPublic";

export default class JwtServiceImpl implements JwtService {
    parse(jwt: string): Nullish<SignedJWT> {
        return SignedJWT.parse(jwt);
    }
    encode(str: string): string {
        return base64url.encode(str);
    }
    async verify(jwt: VCLJwt, jwk: string): Promise<boolean> {
        let parsedJwk = JSON.parse(jwk);

        // TODO: test
        try {
            await jwtVerify(jwt.encodedJwt!, parsedJwk);
            return true;
        } catch (error) {
            return false;
        }
    }

    async sign(jwtDescriptor: VCLJwtDescriptor): Promise<Nullish<SignedJWT>> {
        const jwk = this.generateJwkSECP256K1(jwtDescriptor.kid);
        let publicJwk = await jwk.toPublicJWK();

        const header = {
            alg: "ES256K",
            jwk: publicJwk,
            typ: "JWT",
        };

        new SignJWT(jwtDescriptor.payload)
            .setProtectedHeader(header)
            .setAudience(jwtDescriptor.iss)
            .setIssuer(jwtDescriptor.iss)
            .setJti(jwtDescriptor.jti)
            .setIssuedAt(Date.now())
            .setNotBefore(Date.now())
            .setExpirationTime(new Date().addDaysToNow(7).getTime())
            .setSubject("".randomString(10));

        let result = crypto
            .createSign("SHA256")
            .sign(jwk.privateKey, "base64url");
        return SignedJWT.parse(result);
    }

    generateDidJwk(didJwkDescriptor: Nullish<VCLDidJwkDescriptor>): VCLDidJwk {
        throw new Error("Method not implemented.");
    }

    generateJwk = async () => {
        const keyPair = crypto.generateKeyPairSync("ec", {
            namedCurve: "secp256k1",
        });
        const publicKey = await exportJWK(keyPair.publicKey);
        return this.getDidUriFromJwk(publicKey);
    };

    jwkToPublicBase64Url = (json: JWK) => {
        let c = canonicalize(json);
        if (!c) {
            return "";
        }
        return base64url.encode(c);
    };

    getDidUriFromJwk = (publicJwk: JWK) => {
        const publicKey = this.jwkToPublicBase64Url(publicJwk);
        return util.format("did:jwk:%s", publicKey);
    };

    private generateJwkSECP256K1(kid: string) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
            namedCurve: "secp256k1",
        });

        return {
            async toPublicJWK() {
                const publicJwk = await exportJWK(publicKey);
                publicJwk.kid = kid;
                publicJwk.p;
                return publicJwk;
            },
            publicKey,
            privateKey,
        };
    }

    private generateJwkPublic(kid: string) {
        return VCLJwkPublic.fromJSON(
            this.generateJwkSECP256K1(kid).toPublicJWK()
        );
    }
}
