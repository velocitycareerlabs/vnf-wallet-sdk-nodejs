import {
    KeyPairKeyObjectResult,
    generateKeyPairSync,
    randomUUID,
} from "crypto";
import { JWK, exportJWK } from "jose";
import VCLDidJwk from "../../api/entities/VCLDidJwk";
import VCLResult from "../../api/entities/VCLResult";
import VCLToken from "../../api/entities/VCLToken";
import VCLKeyService from "../../api/keys/VCLKeyService";
import SecretStoreService from "../domain/infrastructure/db/SecretStoreService";
import VCLPublicJwk from "../../api/entities/VCLPublicJwk";

export default class VCLKeyServiceLocalImpl implements VCLKeyService {
    constructor(private readonly secretStoreService: SecretStoreService) {}
    async generateDidJwk(
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<VCLDidJwk>> {
        let ecKeyResult = await this.generateSecret();
        const [err, ecKey] = ecKeyResult.handleResult();
        if (err) return new VCLResult.Error(err);

        const publicJwk = await exportJWK(ecKey!.publicKey);

        return new VCLResult.Success(
            new VCLDidJwk(
                await VCLDidJwk.Utils.generateDidJwk(ecKey!),
                VCLPublicJwk.fromJSON(publicJwk),
                VCLDidJwk.Utils.generateKidFromDidJwk(ecKey!),
                publicJwk!.kid!
            )
        );
    }
    async generateSecret(): Promise<VCLResult<KeyPairKeyObjectResult>> {
        let keyId = randomUUID().toString();
        let ecKey = generateKeyPairSync("ec", {
            namedCurve: "secp256k1",
        });

        this.secretStoreService.storeKey(keyId, ecKey);
        return new VCLResult.Success(ecKey);
    }
    async retrieveSecretReference(
        keyId: string
    ): Promise<VCLResult<KeyPairKeyObjectResult>> {
        try {
            let key = this.secretStoreService.retrieveKey(keyId);
            return new VCLResult.Success(key);
        } catch (error) {
            return new VCLResult.Error(error as any);
        }
    }
    async retrievePublicJwk(
        ecKey: KeyPairKeyObjectResult
    ): Promise<VCLResult<JWK>> {
        try {
            const publicJwk = await exportJWK(ecKey.publicKey);
            return new VCLResult.Success(publicJwk);
        } catch (error) {
            return new VCLResult.Error(error as any);
        }
    }
}
