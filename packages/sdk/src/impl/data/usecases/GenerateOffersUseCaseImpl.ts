import VCLGenerateOffersDescriptor from "../../../api/entities/VCLGenerateOffersDescriptor";
import VCLOffers from "../../../api/entities/VCLOffers";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import GenerateOffersRepository from "../../domain/repositories/GenerateOffersRepository";
import GenerateOffersUseCase from "../../domain/usecases/GenerateOffersUseCase";

export default class GenerateOffersUseCaseImpl
    implements GenerateOffersUseCase
{
    constructor(private generateOffersRepository: GenerateOffersRepository) {}

    generateOffers(
        token: VCLToken,
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        completionBlock: (r: VCLResult<VCLOffers>) => any
    ): void {
        this.generateOffersRepository.generateOffers(
            token,
            generateOffersDescriptor,
            completionBlock
        );
    }
}
