import VCLVerifiedProfile from "../../../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../../../api/entities/VCLVerifiedProfileDescriptor";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import VerifiedProfileRepository from "../../domain/repositories/VerifiedProfileRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues, Params } from "./Urls";

export default class VerifiedProfileRepositoryImpl
    implements VerifiedProfileRepository
{
    constructor(private readonly networkService: NetworkService) {}

    async getVerifiedProfile(verifiedProfileDescriptor: VCLVerifiedProfileDescriptor): Promise<VCLVerifiedProfile> {
        const verifiedProfileResponse = await this.networkService.sendRequest({
            method: HttpMethod.GET,
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
        return new VCLVerifiedProfile(verifiedProfileResponse.payload)
    }
}
