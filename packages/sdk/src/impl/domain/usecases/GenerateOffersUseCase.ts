import VCLGenerateOffersDescriptor from "../../../api/entities/VCLGenerateOffersDescriptor";
import VCLOffers from "../../../api/entities/VCLOffers";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";

export default interface GenerateOffersUseCase {
    generateOffers(
        token: VCLToken,
        generateOffersDescriptor: VCLGenerateOffersDescriptor
    ): Promise<VCLResult<VCLOffers>>;
}
