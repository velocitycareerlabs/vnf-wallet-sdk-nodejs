import NetworkService from "../impl/domain/infrastructure/network/NetworkService";
import VCLResult from "../api/entities/VCLResult";
import Request, {
    HttpMethod,
} from "../impl/data/infrastructure/network/Request";
import Response from "../impl/data/infrastructure/network/Response";

export class NetworkServiceSuccess implements NetworkService {
    sendRequest(params: Request): Promise<VCLResult<Response>>;
    sendRequest(params: {
        endpoint: string;
        body: Nullish<any>;
        contentType: Nullish<string>;
        method: HttpMethod;
        headers: any;
        useCaches: boolean;
    }): Promise<VCLResult<Response>>;
    sendRequest(params: unknown): Promise<VCLResult<Response>> {
        throw new Error("Method not implemented.");
    }
}
