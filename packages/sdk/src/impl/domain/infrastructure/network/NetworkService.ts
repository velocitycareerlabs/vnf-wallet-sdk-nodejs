import VCLResult from "../../../../api/entities/VCLResult";
import Request, {
    HttpMethod,
} from "../../../data/infrastructure/network/Request";
import Response from "../../../data/infrastructure/network/Response";

type NetworkRequesParams = {
    endpoint: string;
    body: any | null | undefined;
    contentType: string | null | undefined;
    method: HttpMethod;
    headers: any;
    useCaches: boolean;
};

export default interface NetworkService {
    sendRequestRaw(params: Request): Promise<VCLResult<Response>>;

    sendRequest(params: NetworkRequesParams): Promise<VCLResult<Response>>;
}
