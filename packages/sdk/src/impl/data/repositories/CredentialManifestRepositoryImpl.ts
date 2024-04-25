import VCLCredentialManifest from "../../../api/entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "../../../api/entities/VCLCredentialManifestDescriptor";
import VCLError from "../../../api/entities/error/VCLError";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialManifestRepository from "../../domain/repositories/CredentialManifestRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Response from "../infrastructure/network/Response";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class CredentialManifestRepositoryImpl
    implements CredentialManifestRepository
{
    constructor(private readonly networkService: NetworkService) {}

    async getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor
    ): Promise<VCLResult<string>> {
        const endpoint = credentialManifestDescriptor.endpoint;
        if (!endpoint) {
            return new VCLResult.Error(
                new VCLError("credentialManifestDescriptor.endpoint = null")
            );
        }

        const result = await this.networkService.sendRequest({
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
        const [err, credentialManifestResponse] = await result.handleResult();
        if (err) {
            return new VCLResult.Error(err);
        }
        try {
            const jwtStr =
                credentialManifestResponse!.payload[
                    VCLCredentialManifest.KeyIssuingRequest
                ];
            return new VCLResult.Success(jwtStr);
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error));
        }
    }
}
