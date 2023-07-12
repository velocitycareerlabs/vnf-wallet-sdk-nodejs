import VCLResult from "../../../api/entities/VCLResult";
import VCLVerifiedProfile from "../../../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../../../api/entities/VCLVerifiedProfileDescriptor";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import VerifiedProfileRepository from "../../domain/repositories/VerifiedProfileRepository";
import Urls, { HeaderKeys, HeaderValues, Params } from "./Urls";

export default class VerifiedProfileRepositoryImpl
    implements VerifiedProfileRepository
{
    constructor(private readonly networkService: NetworkService) {}

    getVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
        completionBlock: (r: VCLResult<VCLVerifiedProfile>) => any
    ): void {
        this.networkService.sendRequestRaw({
            method: "GET",
            endpoint: Urls.VerifiedProfile.replace(
                Params.Did,
                verifiedProfileDescriptor.did
            ),
            body: null,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            completionBlock(result) {
                result.handleResult(
                    (verifiedProfileResponse) => {
                        return completionBlock(
                            new VCLResult.Success(
                                new VCLVerifiedProfile(
                                    verifiedProfileResponse.payload
                                )
                            )
                        );
                    },
                    (error) => {
                        return completionBlock(new VCLResult.Error(error));
                    }
                );
            },
            contentType: null,
            useCaches: false,
        });
    }
}
