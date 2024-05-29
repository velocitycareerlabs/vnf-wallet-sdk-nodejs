import VCLCredentialTypeSchema from "../../../api/entities/VCLCredentialTypeSchema";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialTypeSchemaRepository from "../../domain/repositories/CredentialTypeSchemaRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";
import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";

export default class CredentialTypeSchemaRepositoryImpl
    implements CredentialTypeSchemaRepository
{
    constructor(private networkService: NetworkService) {}

    getCredentialTypeSchema(
        schemaName: string
    ): Promise<VCLCredentialTypeSchema> {
        return this.fetchCredentialTypeSchema(
            Urls.CredentialTypeSchemas + schemaName
        );
    }

    private async fetchCredentialTypeSchema(
        endpoint: string
    ): Promise<VCLCredentialTypeSchema> {
        const credentialTypeSchemaResponse = await this.networkService.sendRequest({
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
        return new VCLCredentialTypeSchema(credentialTypeSchemaResponse.payload)
    }
}
