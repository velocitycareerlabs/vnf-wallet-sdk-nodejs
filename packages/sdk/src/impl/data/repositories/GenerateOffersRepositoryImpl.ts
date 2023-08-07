import VCLError from "../../../api/entities/VCLError";
import VCLGenerateOffersDescriptor from "../../../api/entities/VCLGenerateOffersDescriptor";
import VCLOffers from "../../../api/entities/VCLOffers";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import GenerateOffersRepository from "../../domain/repositories/GenerateOffersRepository";
import Response from "../infrastructure/network/Response";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class GenerateOffersRepositoryImpl
    implements GenerateOffersRepository
{
    constructor(private networkService: NetworkService) {}

    async generateOffers(
        token: VCLToken,
        generateOffersDescriptor: VCLGenerateOffersDescriptor
    ): Promise<VCLResult<VCLOffers>> {
        let result = await this.networkService.sendRequest({
            useCaches: false,
            endpoint: generateOffersDescriptor.checkOffersUri,
            headers: {
                [HeaderKeys.HeaderKeyAuthorization]: `${HeaderKeys.HeaderValuePrefixBearer} ${token.value}`,
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: generateOffersDescriptor.payload,
            method: "POST",
            contentType: "application/json",
        });
        let [error, offersResponse] = await result.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }
        if (offersResponse) {
            try {
                return new VCLResult.Success(this.parse(offersResponse, token));
            } catch (error: any) {
                return new VCLResult.Error(new VCLError(error));
            }
        }

        return new VCLResult.Error(new VCLError("Offers did not returned."));
    }

    parse(offersResponse: Response, token: VCLToken): VCLOffers {
        try {
            return new VCLOffers(
                offersResponse.payload,
                offersResponse.code,
                token
            );
        } catch (ex) {
            return new VCLOffers([], offersResponse.code, token);
        }
    }
}
