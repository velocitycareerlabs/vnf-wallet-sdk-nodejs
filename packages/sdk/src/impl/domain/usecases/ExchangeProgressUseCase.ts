import VCLExchange from "../../../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../../../api/entities/VCLExchangeDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface ExchangeProgressUseCase {
    getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor
    ): Promise<VCLResult<VCLExchange>>;
}
