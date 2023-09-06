import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import ResolveKidRepository from "../../domain/repositories/ResolveKidRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class ResolveKidRepositoryImpl implements ResolveKidRepository {
    constructor(private readonly networkService: NetworkService) {}

    async getPublicKey(kid: string): Promise<VCLResult<VCLJwkPublic>> {
        let result = await this.networkService.sendRequest({
            endpoint:
                Urls.ResolveKid + kid + `?format=${VCLJwkPublic.Format.jwk}`,
            method: HttpMethod.GET,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            contentType: null,
            useCaches: false,
        });

        let [error, publicKeyResponse] = await result.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }

        return new VCLResult.Success(
            VCLJwkPublic.fromJSON(publicKeyResponse!.payload)
        );
    }
}
