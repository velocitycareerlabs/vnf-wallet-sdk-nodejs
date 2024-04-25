import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface KeyServiceUseCase {
    generateDidJwk(
        didJwkDescriptor: VCLDidJwkDescriptor
    ): Promise<VCLResult<VCLDidJwk>>;
}
