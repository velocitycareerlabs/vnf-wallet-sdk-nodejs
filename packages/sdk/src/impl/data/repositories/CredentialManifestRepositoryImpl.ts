import VCLCredentialManifest from "../../../api/entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "../../../api/entities/VCLCredentialManifestDescriptor";
import VCLError from "../../../api/entities/VCLError";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialManifestRepository from "../../domain/repositories/CredentialManifestRepository";
import Response from "../infrastructure/network/Response";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class CredentialManifestRepositoryImpl
    implements CredentialManifestRepository
{
    constructor(private readonly networkService: NetworkService) {}
    getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        completionBlock: (r: VCLResult<string>) => any
    ): void {
        const endpoint = credentialManifestDescriptor.endpoint;
        if (!endpoint) {
            completionBlock(
                new VCLResult.Error(
                    new VCLError("credentialManifestDescriptor.endpoint = null")
                )
            );
            return;
        }

        this.networkService.sendRequestRaw({
            endpoint,
            method: "GET",
            body: null,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            completionBlock(result: VCLResult<Response>) {
                result.handleResult(
                    (credentialManifestResponse) => {
                        try {
                            let jwtStr =
                                credentialManifestResponse.payload[
                                    VCLCredentialManifest.KeyIssuingRequest
                                ];
                            completionBlock(new VCLResult.Success(jwtStr));
                        } catch (ex: any) {
                            completionBlock(
                                new VCLResult.Error(new VCLError(ex))
                            );
                        }
                    },
                    (error) => {
                        completionBlock(new VCLResult.Error(error));
                    }
                );
            },
            contentType: null,
            useCaches: false,
        });
    }
}
