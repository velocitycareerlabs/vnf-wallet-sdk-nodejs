import VCLCredentialManifest from "../../../api/entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "../../../api/entities/VCLCredentialManifestDescriptor";
import VCLError from "../../../api/entities/error/VCLError";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialManifestRepository from "../../domain/repositories/CredentialManifestRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class CredentialManifestRepositoryImpl
    implements CredentialManifestRepository
{
    constructor(private readonly networkService: NetworkService) {}

    async getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor
    ): Promise<string> {
        const endpoint = credentialManifestDescriptor.endpoint;
        if (!endpoint) {
            throw new VCLError("credentialManifestDescriptor.endpoint = null");
        }

        const credentialManifestResponse = await this.networkService.sendRequest({
            endpoint,
            method: HttpMethod.GET,
            body: null,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },

            contentType: null,
            useCaches: false,
        });
        return credentialManifestResponse.payload[VCLCredentialManifest.KeyIssuingRequest];
    }
}
