import VCLResult from "../../../../api/entities/VCLResult";
import NetworkService from "../../../domain/infrastructure/network/NetworkService";
import VCLLog from "../../../utils/VCLLog";
import Request, { HttpMethod } from "./Request";
import Response from "./Response";
import axios, { AxiosResponse } from "axios";
// TODO: implement response caching

export default class NetworkServiceImpl implements NetworkService {
    static TAG = NetworkServiceImpl.name;

    async sendRequestRaw(params: Request): Promise<VCLResult<Response>> {
        let handler: () => Nullish<Promise<AxiosResponse<any, any>>> = () => {
            return null;
        };
        switch (params.method) {
            case "GET":
                handler = () =>
                    axios.get(params.endpoint, {
                        headers: {
                            ...params.headers,
                        },
                    });
                break;
            case "POST":
                handler = () =>
                    axios
                        .create({ ...axios.defaults })
                        .post(params.endpoint, params.body, {
                            headers: {
                                ...params.headers,
                                "Content-Type": params.contentType,
                            },
                        });
                break;
            default:
                break;
        }
        try {
            let r = await handler();
            return new VCLResult.Success(new Response(r!.data, r!.status));
        } catch (error: any) {
            return new VCLResult.Error(error.response?.data ?? error);
        }
    }

    async sendRequest(params: {
        endpoint: string;
        body: Nullish<any>;
        contentType: Nullish<string>;
        method: HttpMethod;
        headers: any;
        useCaches: boolean;
    }): Promise<VCLResult<Response>> {
        return this.sendRequestRaw(params);
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
