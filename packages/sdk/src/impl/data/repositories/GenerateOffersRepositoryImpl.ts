import VCLError from "../../../api/entities/error/VCLError";
import VCLGenerateOffersDescriptor from "../../../api/entities/VCLGenerateOffersDescriptor";
import VCLOffers from "../../../api/entities/VCLOffers";
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
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        sessionToken: VCLToken
    ): Promise<VCLOffers> {
        const offersResponse = await this.networkService.sendRequest({
            useCaches: false,
            endpoint: generateOffersDescriptor.checkOffersUri,
            headers: {
                [HeaderKeys.HeaderKeyAuthorization]: `${HeaderKeys.HeaderValuePrefixBearer} ${sessionToken.value}`,
                [HeaderKeys.XVnfProtocolVersion]:
                HeaderValues.XVnfProtocolVersion,
            },
            body: generateOffersDescriptor.payload,
            method: HttpMethod.POST,
            contentType: "application/json",
        });
        if (offersResponse) {
            return this.parse(offersResponse, sessionToken);
        }
        throw new VCLError("Offers did not returned.");
    }

    parse(offersResponse: Response, sessionToken: VCLToken): VCLOffers {
        const payload = offersResponse.payload;

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
