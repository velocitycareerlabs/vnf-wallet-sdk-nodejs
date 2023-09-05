import VCLCredentialTypeSchema from "../../../api/entities/VCLCredentialTypeSchema";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialTypeSchemaRepository from "../../domain/repositories/CredentialTypeSchemaRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class CredentialTypeSchemaRepositoryImpl
    implements CredentialTypeSchemaRepository
{
    constructor(private networkService: NetworkService) {}

    getCredentialTypeSchema(
        schemaName: string
    ): Promise<VCLResult<VCLCredentialTypeSchema>> {
        return this.fetchCredentialTypeSchema(
            Urls.CredentialTypeSchemas + schemaName
        );
    }

    private async fetchCredentialTypeSchema(
        endpoint: string
    ): Promise<VCLResult<VCLCredentialTypeSchema>> {
        let result = await this.networkService.sendRequest({
            endpoint,
            method: HttpMethod.GET,
            body: null,
            useCaches: true,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            contentType: null,
        });

        let [error, credentialTypeSchemaResponse] = result.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }

        return new VCLResult.Success(
            new VCLCredentialTypeSchema(credentialTypeSchemaResponse!.payload)
        );
    }
}
