import VCLCredentialType from "../../../api/entities/VCLCredentialType";
import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import VCLError from "../../../api/entities/error/VCLError";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialTypesRepository from "../../domain/repositories/CredentialTypesRepository";
import Request, { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class CredentialTypesRepositoryImpl
    implements CredentialTypesRepository
{
    constructor(private readonly networkService: NetworkService) {}

    async getCredentialTypes(): Promise<VCLResult<VCLCredentialTypes>> {
        const endpoint = Urls.CredentialTypes;
        return await this.fetchCredentialTypes(endpoint);
    }

    async fetchCredentialTypes(
        endpoint: string
    ): Promise<VCLResult<VCLCredentialTypes>> {
        const result = await this.networkService.sendRequest({
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

        const [err, credentialTypesResponse] = result.handleResult();
        if (err) {
            return new VCLResult.Error(err);
        }
        return new VCLResult.Success(
            new VCLCredentialTypes(
                (credentialTypesResponse!.payload as JSONObject[]).map(
                    (item: JSONObject) => {
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
        );
    }
}
