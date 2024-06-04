import VCLGenerateOffersDescriptor from "../../../api/entities/VCLGenerateOffersDescriptor";
import VCLOffers from "../../../api/entities/VCLOffers";
import VCLToken from "../../../api/entities/VCLToken";
import GenerateOffersRepository from "../../domain/repositories/GenerateOffersRepository";
import GenerateOffersUseCase from "../../domain/usecases/GenerateOffersUseCase";
import VCLError from "../../../api/entities/error/VCLError";

export default class GenerateOffersUseCaseImpl
    implements GenerateOffersUseCase
{
    constructor(private generateOffersRepository: GenerateOffersRepository) {}

    async generateOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        sessionToken: VCLToken
    ): Promise<VCLOffers> {
        try {
            return await this.generateOffersRepository.generateOffers(generateOffersDescriptor, sessionToken);
        } catch (error: any) {
            throw VCLError.fromError(error);
        }
    }
}
