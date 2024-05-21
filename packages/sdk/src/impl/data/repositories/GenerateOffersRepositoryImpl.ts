import VCLError from "../../../api/entities/error/VCLError";
import VCLGenerateOffersDescriptor from "../../../api/entities/VCLGenerateOffersDescriptor";
import VCLOffers from "../../../api/entities/VCLOffers";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import GenerateOffersRepository from "../../domain/repositories/GenerateOffersRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Response from "../infrastructure/network/Response";
import { HeaderKeys, HeaderValues } from "./Urls";
import { Utils } from "../utils/Utils";

export default class GenerateOffersRepositoryImpl
    implements GenerateOffersRepository {
    constructor(private networkService: NetworkService) {
    }

    async generateOffers(
        token: VCLToken,
        generateOffersDescriptor: VCLGenerateOffersDescriptor
    ): Promise<VCLResult<VCLOffers>> {
        const result = await this.networkService.sendRequest({
            useCaches: false,
            endpoint: generateOffersDescriptor.checkOffersUri,
            headers: {
                [HeaderKeys.HeaderKeyAuthorization]: `${HeaderKeys.HeaderValuePrefixBearer} ${token.value}`,
                [HeaderKeys.XVnfProtocolVersion]:
                HeaderValues.XVnfProtocolVersion,
            },
            body: generateOffersDescriptor.payload,
            method: HttpMethod.POST,
            contentType: "application/json",
        });
        const [error, offersResponse] = result.handleResult();
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

    parse(offersResponse: Response, sessionToken: VCLToken): VCLOffers {
        const payload = JSON.parse(offersResponse.payload);

        if (payload) {
            if (Array.isArray(payload)) {
                return new VCLOffers(
                    payload,
                    Utils.offersFromJsonArray(payload),
                    offersResponse.code,
                    sessionToken
                );
            } else {
                return new VCLOffers(
                    payload,
                    Utils.offersFromJsonArray(payload[VCLOffers.CodingKeys.KeyOffers] || []),
                    offersResponse.code,
                    sessionToken,
                    payload[VCLOffers.CodingKeys.KeyChallenge]
                );
            }
        } else {
            return new VCLOffers(
                {},
                [],
                offersResponse.code,
                sessionToken
            );
        }
    }
}
