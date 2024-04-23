// Assuming similar entity structures and imports for Node.js environment

import { JWK } from "jose";
import VCLDidJwk from "../entities/VCLDidJwk";
import VCLResult from "../entities/VCLResult";
import VCLToken from "../entities/VCLToken";
import { KeyObject, KeyPairKeyObjectResult } from "crypto";
import VCLDidJwkDescriptor from "../entities/VCLDidJwkDescriptor";

export default interface VCLKeyService {
    generateDidJwk(
        didJwkDescriptor: VCLDidJwkDescriptor
    ): Promise<VCLResult<VCLDidJwk>>;
}
