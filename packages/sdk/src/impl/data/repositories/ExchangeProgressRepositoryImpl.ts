import VCLError from "../../../api/entities/VCLError";
import VCLExchange from "../../../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../../../api/entities/VCLExchangeDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import ExchangeProgressRepository from "../../domain/repositories/ExchangeProgressRepository";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class ExchangeProgressRepositoryImpl
    implements ExchangeProgressRepository
{
    constructor(private networkService: NetworkService) {}

    getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor,
        completionBlock: (r: VCLResult<VCLExchange>) => any
    ): void {
        this.networkService.sendRequestRaw({
            useCaches: false,
            method: "GET",
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
            contentType: "application/json",
            completionBlock: (submissionResult) => {
                submissionResult.handleResult(
                    (exchangeProgressResponse) => {
                        try {
                            completionBlock(
                                new VCLResult.Success(
                                    this.parseExchange(
                                        exchangeProgressResponse.payload
                                    )
                                )
                            );
                        } catch (ex: any) {
                            completionBlock(
                                new VCLResult.Error(new VCLError(ex))
                            );
                        }
                    },
                    (error) => {
                        completionBlock(new VCLResult.Error(error));
                    }
                );
            },
        });
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
