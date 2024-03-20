// Assuming similar entity structures and imports for Node.js environment

import { JWK } from "jose";
import VCLDidJwk from "../entities/VCLDidJwk";
import VCLResult from "../entities/VCLResult";
import VCLToken from "../entities/VCLToken";
import { KeyObject, KeyPairKeyObjectResult } from "crypto";

export default interface VCLKeyService {
    generateDidJwk(
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<VCLDidJwk>>;

    // Implemented for local crypto services only
    generateSecret(): Promise<VCLResult<KeyPairKeyObjectResult>>;

    // Implemented for local crypto services only
    retrieveSecretReference(
        keyId: string
    ): Promise<VCLResult<KeyPairKeyObjectResult>>;

    // Implemented for local crypto services only
    retrievePublicJwk(ecKey: KeyPairKeyObjectResult): Promise<VCLResult<JWK>>;
}
