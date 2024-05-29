import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import ResolveKidRepository from "../../domain/repositories/ResolveKidRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class ResolveKidRepositoryImpl implements ResolveKidRepository {
    constructor(private readonly networkService: NetworkService) {}

    async getPublicKey(kid: string): Promise<VCLPublicJwk> {
        const publicKeyResponse = await this.networkService.sendRequest({
            endpoint:
                Urls.ResolveKid + kid + `?format=${VCLPublicJwk.Format.jwk}`,
            method: HttpMethod.GET,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            contentType: null,
            useCaches: false,
        });
        return VCLPublicJwk.fromJSON(publicKeyResponse.payload);
    }
}
