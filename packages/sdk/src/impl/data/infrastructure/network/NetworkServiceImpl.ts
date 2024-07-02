import { Nullish } from "../../../../api/VCLTypes";
import NetworkService from "../../../domain/infrastructure/network/NetworkService";
import VCLLog from "../../../utils/VCLLog";
import Request, { HttpMethod } from "./Request";
import Response from "./Response";
import axios, { AxiosResponse } from "axios";
// TODO: implement response caching

export default class NetworkServiceImpl implements NetworkService {
    static TAG = NetworkServiceImpl.name;

    async sendRequestRaw(params: Request): Promise<Response> {
        let handler: () => Nullish<Promise<AxiosResponse<any, any>>> = () => {
            return null;
        };
        switch (params.method) {
            case HttpMethod.GET:
                handler = () =>
                    axios.create({ ...axios.defaults }).get(params.endpoint, {
                        headers: {
                            ...params.headers,
                        },
                    });
                break;
            case HttpMethod.POST:
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
            const r = await handler();
            return new Response(r!.data, r!.status);
        } catch (error: any) {
            throw (error.response?.data ?? error);
        }
    }

    async sendRequest(params: {
        endpoint: string;
        body: Nullish<any>;
        contentType: Nullish<string>;
        method: HttpMethod;
        headers: any;
        useCaches: boolean;
    }): Promise<Response> {
        return this.sendRequestRaw(params);
    }

    logRequest(request: Request) {
        const methodLog = `Request Method: ${request.method}`;
        const endpointLog = `\nRequest Endpoint: ${request.endpoint}`;
        const bodyLog = request.body
            ? `\nRequest Body: ${JSON.stringify(request.body)}`
            : "\n";
        VCLLog.d(
            NetworkServiceImpl.TAG,
            `${methodLog}${endpointLog}${bodyLog}`
        );
    }
}
