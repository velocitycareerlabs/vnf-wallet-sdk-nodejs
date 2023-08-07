import VCLError from "../../../api/entities/VCLError";
import VCLPresentationRequest from "../../../api/entities/VCLPresentationRequest";
import VCLPresentationRequestDescriptor from "../../../api/entities/VCLPresentationRequestDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import PresentationRequestRepository from "../../domain/repositories/PresentationRequestRepository";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class PresentationRequestRepositoryImpl
    implements PresentationRequestRepository
{
    constructor(private readonly networkService: NetworkService) {}

    async getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<string>> {
        const endpoint = presentationRequestDescriptor.endpoint;
        if (!endpoint) {
            return new VCLResult.Error(
                new VCLError("presentationRequestDescriptor.endpoint = null")
            );
        }

        let encodedJwtResult = await this.networkService.sendRequest({
            endpoint,
            contentType: "application/json",
            method: "GET",
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            useCaches: false,
        });

        let [error, presentationRequestResponse] =
            await encodedJwtResult.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }
        try {
            const encodedJwtStr =
                presentationRequestResponse!.payload[
                    VCLPresentationRequest.KeyPresentationRequest
                ];
            return new VCLResult.Success(encodedJwtStr);
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error));
        }
    }
}
