import VCLError from "../../../api/entities/VCLError";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import FinalizeOffersRepository from "../../domain/repositories/FinalizeOffersRepository";
import { HeaderKeys, HeaderValues } from "./Urls";

export class FinalizeOffersRepositoryImpl implements FinalizeOffersRepository {
    constructor(private networkService: NetworkService) {}

    finalizeOffers(
        token: VCLToken,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        completionBlock: (r: VCLResult<string[]>) => any
    ): void {
        this.networkService.sendRequestRaw({
            useCaches: false,
            endpoint: finalizeOffersDescriptor.finalizeOffersUri,
            body: finalizeOffersDescriptor.payload,
            headers: {
                [HeaderKeys.HeaderKeyAuthorization]: `${HeaderKeys.HeaderValuePrefixBearer} ${token.value}`,
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            contentType: "application/json",
            method: "POST",
            completionBlock: (result) => {
                result.handleResult(
                    (finalizedOffersResponse) => {
                        try {
                            const encodedJwts: Nullish<string[]> =
                                finalizedOffersResponse.payload as Nullish<
                                    string[]
                                >;

                            if (encodedJwts) {
                                completionBlock(
                                    new VCLResult.Success(encodedJwts)
                                );
                            } else {
                                completionBlock(
                                    new VCLResult.Error(
                                        new VCLError(
                                            `Failed to parse: ${finalizedOffersResponse.payload}`
                                        )
                                    )
                                );
                            }
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
}
