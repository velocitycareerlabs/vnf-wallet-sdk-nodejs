import { KeyPairKeyObjectResult } from "crypto";
import { Nullish } from "../../../../types";

export default interface SecretStoreService {
    storeKey(keyId: string, key: KeyPairKeyObjectResult): void;
    retrieveKey(keyId: string): Nullish<KeyPairKeyObjectResult>;
    containsKey(keyId: string): boolean;
}
