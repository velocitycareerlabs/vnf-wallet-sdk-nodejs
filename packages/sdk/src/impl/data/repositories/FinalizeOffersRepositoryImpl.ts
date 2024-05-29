import { Nullish } from "../../../api/VCLTypes";
import VCLError from "../../../api/entities/error/VCLError";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLToken from "../../../api/entities/VCLToken";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import FinalizeOffersRepository from "../../domain/repositories/FinalizeOffersRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import { HeaderKeys, HeaderValues } from "./Urls";
import VCLJwt from "../../../api/entities/VCLJwt";

export class FinalizeOffersRepositoryImpl implements FinalizeOffersRepository {
    constructor(private networkService: NetworkService) {
    }

    async finalizeOffers(
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        sessionToken: VCLToken
    ): Promise<VCLJwt[]> {
        const finalizedOffersResponse = await this.networkService.sendRequest({
            useCaches: false,
            endpoint: finalizeOffersDescriptor.finalizeOffersUri,
            body: finalizeOffersDescriptor.payload,
            headers: {
                [HeaderKeys.HeaderKeyAuthorization]: `${HeaderKeys.HeaderValuePrefixBearer} ${sessionToken.value}`,
                [HeaderKeys.XVnfProtocolVersion]:
                HeaderValues.XVnfProtocolVersion,
            },
            contentType: "application/json",
            method: HttpMethod.POST,
        });

        const encodedJwtCredArr: Nullish<string[]> = (finalizedOffersResponse.payload as Nullish<string[]>);
        if (encodedJwtCredArr) {
            return encodedJwtCredArr.map((encodedJwtCred) => VCLJwt.fromEncodedJwt(encodedJwtCred));
        }

        throw new VCLError(`Failed to parse: ${finalizedOffersResponse.payload}`);
    }
}
