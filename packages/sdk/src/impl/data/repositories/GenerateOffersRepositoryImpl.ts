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

    generateOffers(
        token: VCLToken,
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        completionBlock: (r: VCLResult<VCLOffers>) => any
    ): void {
        this.networkService.sendRequestRaw({
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
            completionBlock: (result) => {
                result.handleResult(
                    (offersResponse) => {
                        try {
                            completionBlock(
                                new VCLResult.Success(
                                    this.parse(offersResponse, token)
                                )
                            );
                        } catch (error: any) {
                            completionBlock(
                                new VCLResult.Error(new VCLError(error))
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
