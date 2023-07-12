import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import ResolveKidRepository from "../../domain/repositories/ResolveKidRepository";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class ResolveKidRepositoryImpl implements ResolveKidRepository {
    constructor(private readonly networkService: NetworkService) {}

    getPublicKey(
        kid: string,
        completionBlock: (r: VCLResult<VCLJwkPublic>) => any
    ): void {
        this.networkService.sendRequestRaw({
            endpoint:
                Urls.ResolveKid + kid + `?format=${VCLJwkPublic.Format.jwk}`,
            method: "GET",
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            completionBlock(result) {
                result.handleResult(
                    (publicKeyResponse) => {
                        completionBlock(
                            new VCLResult.Success(
                                VCLJwkPublic.fromJSON(publicKeyResponse.payload)
                            )
                        );
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
