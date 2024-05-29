import VCLCredentialType from "../../../api/entities/VCLCredentialType";
import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialTypesRepository from "../../domain/repositories/CredentialTypesRepository";
import Request, { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";
import { Dictionary } from "../../../api/VCLTypes";

export default class CredentialTypesRepositoryImpl
    implements CredentialTypesRepository {
    constructor(private readonly networkService: NetworkService) {
    }

    async getCredentialTypes(): Promise<VCLCredentialTypes> {
        const endpoint = Urls.CredentialTypes;
        return await this.fetchCredentialTypes(endpoint);
    }

    async fetchCredentialTypes(
        endpoint: string
    ): Promise<VCLCredentialTypes> {
        const credentialTypesResponse = await this.networkService.sendRequest({
            endpoint,
            contentType: Request.ContentTypeApplicationJson,
            method: HttpMethod.GET,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                HeaderValues.XVnfProtocolVersion,
            },
            useCaches: true,
            body: null,
        });
        return new VCLCredentialTypes(
            (credentialTypesResponse.payload as Dictionary<any>[]).map(
                (item: Dictionary<any>) => {
                    return new VCLCredentialType(
                        item,
                        item[VCLCredentialType.KeyId],
                        item[VCLCredentialType.KeySchema],
                        item[VCLCredentialType.KeyCreatedAt],
                        item[VCLCredentialType.KeySchemaName],
                        item[VCLCredentialType.KeyCredentialType],
                        item[VCLCredentialType.KeyRecommended]
                    );
                }
            )
        )
    }
}
