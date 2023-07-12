import VCLResult from "../../../../api/entities/VCLResult";
import NetworkService from "../../../domain/infrastructure/network/NetworkService";
import VCLLog from "../../../utils/VCLLog";
import Request, { HttpMethod } from "./Request";
import Response from "./Response";
import axios, { AxiosResponse } from "axios";
// TODO: implement response caching

export default class NetworkServiceImpl implements NetworkService {
    static TAG = NetworkServiceImpl.name;

    sendRequest(
        params: Request,
        completionBlock: (r: VCLResult<Response>) => any
    ): void {
        let handler: () => Nullish<Promise<AxiosResponse<any, any>>> = () => {
            return null;
        };
        switch (params.method) {
            case "GET":
                handler = () =>
                    axios.get(params.endpoint, {
                        headers: {
                            ...params.headers,
                            "Content-Type": params.contentType,
                        },
                    });
                break;
            case "POST":
                handler = () =>
                    axios.post(params.endpoint, Boolean, {
                        headers: {
                            ...params.headers,
                            "Content-Type": params.contentType,
                        },
                    });
                break;
            default:
                break;
        }
        handler()
            ?.then((r) => completionBlock(new VCLResult.Success(r.data)))
            .catch((error) =>
                completionBlock(new VCLResult.Error(error.response.data))
            );
    }

    sendRequestRaw(params: {
        endpoint: string;
        body: Nullish<any>;
        contentType: Nullish<string>;
        method: HttpMethod;
        headers: any;
        useCaches: boolean;
        completionBlock: (r: VCLResult<Response>) => any;
    }): void {
        this.sendRequest(params, params.completionBlock);
    }

    logRequest(request: Request) {
        let methodLog = `Request Method: ${request.method}`;
        let endpointLog = `\nRequest Endpoint: ${request.endpoint}`;
        let bodyLog = request.body
            ? `\nRequest Body: ${JSON.stringify(request.body)}`
            : "\n";
        VCLLog.d(
            NetworkServiceImpl.TAG,
            `${methodLog}${endpointLog}${bodyLog}`
        );
    }
}
