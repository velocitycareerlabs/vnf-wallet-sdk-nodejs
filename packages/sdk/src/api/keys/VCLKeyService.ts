// Assuming similar entity structures and imports for Node.js environment

import VCLDidJwk from "../entities/VCLDidJwk";
import VCLResult from "../entities/VCLResult";
import VCLDidJwkDescriptor from "../entities/VCLDidJwkDescriptor";

export default interface VCLKeyService {
    generateDidJwk(
        didJwkDescriptor: VCLDidJwkDescriptor
    ): Promise<VCLResult<VCLDidJwk>>;
}
