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

    async getVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor
    ): Promise<VCLResult<VCLVerifiedProfile>> {
        let result = await this.networkService.sendRequest({
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
            contentType: null,
            useCaches: false,
        });

        let [err, verifiedProfileResponse] = result.handleResult();
        if (err) {
            return new VCLResult.Error(err);
        }

        return new VCLResult.Success(
            new VCLVerifiedProfile(verifiedProfileResponse!.payload)
        );
    }
}
