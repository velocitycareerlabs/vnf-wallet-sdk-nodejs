import { JWK } from "jose";
import SecretStoreService from "../../../domain/infrastructure/db/SecretStoreService";
import { KeyPairKeyObjectResult } from "crypto";

// TODO: switch to more reasonable keystore
export default class SecretStoreServiceImpl implements SecretStoreService {
    private static _store: Map<string, KeyPairKeyObjectResult> = new Map();

    storeKey(keyId: string, key: KeyPairKeyObjectResult): void {
        SecretStoreServiceImpl._store.set(keyId, key);
    }
    retrieveKey(keyId: string): Nullish<KeyPairKeyObjectResult> {
        return SecretStoreServiceImpl._store.get(keyId);
    }
    containsKey(keyId: string): boolean {
        return SecretStoreServiceImpl._store.has(keyId);
    }
}
