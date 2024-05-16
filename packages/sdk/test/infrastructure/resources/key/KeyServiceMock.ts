import { VCLKeyService } from "../../../../src";
import VCLDidJwkDescriptor from "../../../../src/api/entities/VCLDidJwkDescriptor";
import VCLResult from "../../../../src/api/entities/VCLResult";
import VCLDidJwk from "../../../../src/api/entities/VCLDidJwk";

class KeyServiceMock implements VCLKeyService {
    generateDidJwk(
        didJwkDescriptor: VCLDidJwkDescriptor
    ): Promise<VCLResult<VCLDidJwk>> {
        throw new Error("Method not implemented.");
    }
}