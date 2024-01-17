import VCLError from "../../../api/entities/error/VCLError";
import VCLExchange from "../../../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../../../api/entities/VCLExchangeDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import ExchangeProgressRepository from "../../domain/repositories/ExchangeProgressRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class ExchangeProgressRepositoryImpl
    implements ExchangeProgressRepository
{
    constructor(private networkService: NetworkService) {}

    async getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor
    ): Promise<VCLResult<VCLExchange>> {
        let submissionResult = await this.networkService.sendRequest({
            useCaches: false,
            method: HttpMethod.GET,
            endpoint:
                exchangeDescriptor.processUri +
                `?${VCLExchangeDescriptor.KeyExchangeId}=${encodeURIComponent(
                    exchangeDescriptor.exchangeId
                )}`,
            headers: {
                [HeaderKeys.HeaderKeyAuthorization]: `${HeaderKeys.HeaderValuePrefixBearer} ${exchangeDescriptor.token.value}`,
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            contentType: null,
        });

        let [error, exchangeProgressResponse] =
            await submissionResult.handleResult();

        if (error) {
            return new VCLResult.Error(error);
        }

        try {
            return new VCLResult.Success(
                this.parseExchange(exchangeProgressResponse?.payload)
            );
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error));
        }
    }

    private parseExchange(exchangeJsonObj: JSONObject) {
        return new VCLExchange(
            exchangeJsonObj[VCLExchange.KeyId],
            exchangeJsonObj[VCLExchange.KeyType],
            exchangeJsonObj[VCLExchange.KeyDisclosureComplete],
            exchangeJsonObj[VCLExchange.KeyExchangeComplete]
        );
    }
}
