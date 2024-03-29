import VCLExchange from "../../../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../../../api/entities/VCLExchangeDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import ExchangeProgressRepository from "../../domain/repositories/ExchangeProgressRepository";
import ExchangeProgressUseCase from "../../domain/usecases/ExchangeProgressUseCase";

export default class ExchangeProgressUseCaseImpl
    implements ExchangeProgressUseCase
{
    constructor(
        private exchangeProgressRepository: ExchangeProgressRepository
    ) {}
    getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor
    ): Promise<VCLResult<VCLExchange>> {
        return this.exchangeProgressRepository.getExchangeProgress(
            exchangeDescriptor
        );
    }
}
