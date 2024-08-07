/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,unused-imports/no-unused-vars */
import NetworkService from "../src/impl/domain/infrastructure/network/NetworkService";
import Request, {
    HttpMethod,
} from "../src/impl/data/infrastructure/network/Request";
import Response from "../src/impl/data/infrastructure/network/Response";
import { Nullish } from "../src";

export default class NetworkServiceSuccess implements NetworkService {
    constructor(private readonly validResponse: any) {}

    sendRequestRaw(params: Request): Promise<Response> {
        throw new Error("not implemented");
    }

    async sendRequest(params: {
        endpoint: string;
        body: Nullish<any>;
        contentType: Nullish<string>;
        method: HttpMethod;
        headers: any;
        useCaches: boolean;
    }): Promise<Response> {
        return new Response(this.validResponse, 0);
    }
}
