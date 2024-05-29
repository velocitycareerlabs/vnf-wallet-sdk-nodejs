import VCLExchange from "../../../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../../../api/entities/VCLExchangeDescriptor";
import ExchangeProgressRepository from "../../domain/repositories/ExchangeProgressRepository";
import ExchangeProgressUseCase from "../../domain/usecases/ExchangeProgressUseCase";

export default class ExchangeProgressUseCaseImpl implements ExchangeProgressUseCase {
    constructor(private exchangeProgressRepository: ExchangeProgressRepository) {
    }

    async getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor
    ): Promise<VCLExchange> {
        try {
            return await this.exchangeProgressRepository.getExchangeProgress(exchangeDescriptor);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
