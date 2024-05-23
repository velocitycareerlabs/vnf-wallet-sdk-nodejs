import NetworkService from "../src/impl/domain/infrastructure/network/NetworkService";
import VCLResult from "../src/api/entities/VCLResult";
import Request, {
    HttpMethod,
} from "../src/impl/data/infrastructure/network/Request";
import Response from "../src/impl/data/infrastructure/network/Response";
import { Dictionary, Nullish } from "../../sdk//src/api/VCLTypes";

export default class NetworkServiceSuccess implements NetworkService {
    constructor(private readonly validResponse: any) {}

    sendRequestRaw(params: Request): Promise<VCLResult<Response>> {
        throw new Error("not implemented");
    }

    async sendRequest(params: {
        endpoint: string;
        body: Nullish<any>;
        contentType: Nullish<string>;
        method: HttpMethod;
        headers: any;
        useCaches: boolean;
    }): Promise<VCLResult<Response>> {
        return new VCLResult.Success(new Response(this.validResponse, 0));
    }
}
