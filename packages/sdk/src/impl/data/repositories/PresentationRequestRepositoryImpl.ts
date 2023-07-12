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

    getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor,
        completionBlock: (r: VCLResult<string>) => any
    ): void {
        const endpoint = presentationRequestDescriptor.endpoint;
        if (!endpoint) {
            completionBlock(
                new VCLResult.Error(
                    new VCLError(
                        "presentationRequestDescriptor.endpoint = null"
                    )
                )
            );
            return;
        }

        this.networkService.sendRequestRaw({
            endpoint,
            contentType: "application/json",
            method: "GET",
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            completionBlock(encodedJwtResult) {
                encodedJwtResult.handleResult(
                    (presentationRequestResponse) => {
                        try {
                            const encodedJwtStr =
                                presentationRequestResponse.payload[
                                    VCLPresentationRequest
                                        .KeyPresentationRequest
                                ];
                            completionBlock(
                                new VCLResult.Success(encodedJwtStr)
                            );
                        } catch (ex: any) {
                            completionBlock(
                                new VCLResult.Error(new VCLError(ex))
                            );
                        }
                    },
                    (it) => {
                        completionBlock(new VCLResult.Error(it));
                    }
                );
            },
            body: null,
            useCaches: false,
        });
        /*presentationRequestDescriptor.endpoint?.let { endpoint ->
            networkService.sendRequest(
                endpoint = endpoint,
                contentType = Request.ContentTypeApplicationJson,
                method = Request.HttpMethod.GET,
                headers = listOf(Pair(HeaderKeys.XVnfProtocolVersion, HeaderValues.XVnfProtocolVersion)),
                completionBlock = { encodedJwtResult ->
                    encodedJwtResult.handleResult({ presentationRequestResponse ->
                        try {
                            val encodedJwtStr = JSONObject(presentationRequestResponse.payload)
                                .optString(VCLPresentationRequest.KeyPresentationRequest)
                            completionBlock(VCLResult.Success(encodedJwtStr))
                        } catch (ex: Exception) {
                            completionBlock(VCLResult.Failure(VCLError(ex)))
                        }
                    }, {
                        completionBlock(VCLResult.Failure(it))
                    })
                }
            )
        } ?: run {
            completionBlock(VCLResult.Failure(VCLError("presentationRequestDescriptor.endpoint = null")))
        }*/
    }
}
