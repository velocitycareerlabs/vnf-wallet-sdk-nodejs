import VCLResult from "../../../../api/entities/VCLResult";
import Request, {
    HttpMethod,
} from "../../../data/infrastructure/network/Request";
import Response from "../../../data/infrastructure/network/Response";

type NetworkRequesParams = {
    endpoint: string;
    body: Nullish<any>;
    contentType: Nullish<string>;
    method: HttpMethod;
    headers: any;
    useCaches: boolean;
    completionBlock: (r: VCLResult<Response>) => any;
};

export default interface NetworkService {
    sendRequest(
        params: Request,
        completionBlock: (r: VCLResult<Response>) => any
    ): void;

    sendRequestRaw(params: NetworkRequesParams): void;
}
