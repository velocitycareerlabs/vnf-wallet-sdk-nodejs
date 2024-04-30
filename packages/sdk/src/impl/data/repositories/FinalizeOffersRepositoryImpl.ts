import VCLError from "../../../api/entities/error/VCLError";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import FinalizeOffersRepository from "../../domain/repositories/FinalizeOffersRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import { HeaderKeys, HeaderValues } from "./Urls";

export class FinalizeOffersRepositoryImpl implements FinalizeOffersRepository {
    constructor(private networkService: NetworkService) {}

    async finalizeOffers(
        token: VCLToken,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor
    ): Promise<VCLResult<string[]>> {
        const result = await this.networkService.sendRequest({
            useCaches: false,
            endpoint: finalizeOffersDescriptor.finalizeOffersUri,
            body: finalizeOffersDescriptor.payload,
            headers: {
                [HeaderKeys.HeaderKeyAuthorization]: `${HeaderKeys.HeaderValuePrefixBearer} ${token.value}`,
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            contentType: "application/json",
            method: HttpMethod.POST,
        });
        const [error, finalizedOffersResponse] = await result.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }

        try {
            const encodedJwts: string[] | null | undefined =
                finalizedOffersResponse!.payload as string[] | null | undefined;

            if (encodedJwts) {
                return new VCLResult.Success(encodedJwts);
            }
            return new VCLResult.Error(
                new VCLError(
                    `Failed to parse: ${finalizedOffersResponse!.payload}`
                )
            );
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error));
        }
    }
}
