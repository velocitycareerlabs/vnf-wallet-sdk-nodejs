import VCLError from "../../../api/entities/error/VCLError";
import VCLPresentationRequest from "../../../api/entities/VCLPresentationRequest";
import VCLPresentationRequestDescriptor from "../../../api/entities/VCLPresentationRequestDescriptor";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import PresentationRequestRepository from "../../domain/repositories/PresentationRequestRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class PresentationRequestRepositoryImpl
    implements PresentationRequestRepository
{
    constructor(private readonly networkService: NetworkService) {}

    async getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<string> {
        const endpoint = presentationRequestDescriptor.endpoint;
        if (!endpoint) {
            throw new VCLError("presentationRequestDescriptor.endpoint = null");
        }

        const presentationRequestResponse = await this.networkService.sendRequest({
            endpoint,
            contentType: null,
            method: HttpMethod.GET,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            useCaches: false,
        });
        return presentationRequestResponse.payload[
            VCLPresentationRequest.KeyPresentationRequest
        ];
    }
}
