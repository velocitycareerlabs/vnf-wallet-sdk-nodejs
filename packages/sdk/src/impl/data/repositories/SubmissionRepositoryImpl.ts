import VCLError from "../../../api/entities/VCLError";
import VCLExchange from "../../../api/entities/VCLExchange";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLResult from "../../../api/entities/VCLResult";
import VCLSubmission from "../../../api/entities/VCLSubmission";
import VCLSubmissionResult from "../../../api/entities/VCLSubmissionResult";
import VCLToken from "../../../api/entities/VCLToken";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import SubmissionRepository from "../../domain/repositories/SubmissionRepository";
import { HeaderKeys, HeaderValues } from "./Urls";

export default class SubmissionRepositoryImpl implements SubmissionRepository {
    constructor(private networkService: NetworkService) {}
    async submit(
        submission: VCLSubmission,
        jwt: VCLJwt
    ): Promise<VCLResult<VCLSubmissionResult>> {
        let result = await this.networkService.sendRequest({
            endpoint: submission.submitUri,
            body: submission.generateRequestBody(jwt),
            method: "POST",
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            contentType: "application/json",
            useCaches: false,
        });

        let [error, submissionResponse] = await result.handleResult();

        if (submissionResponse) {
            try {
                const jsonObj = submissionResponse.payload;
                const submissionResult = this.parse(
                    jsonObj,
                    submission.jti,
                    submission.submissionId
                );
                return new VCLResult.Success(submissionResult);
            } catch (error: any) {
                return new VCLResult.Error(new VCLError(error));
            }
        }

        return new VCLResult.Error(error!);
    }

    private parseExchange(exchangeJsonObj: JSONObject) {
        return new VCLExchange(
            exchangeJsonObj[VCLExchange.KeyId] ?? "",
            exchangeJsonObj[VCLExchange.KeyType] ?? "",
            exchangeJsonObj[VCLExchange.KeyDisclosureComplete] ?? false,
            exchangeJsonObj[VCLExchange.KeyExchangeComplete] ?? false
        );
    }

    private parse(
        jsonObj: JSONObject,
        jti: String,
        submissionId: String
    ): VCLSubmissionResult {
        let exchangeJsonObj = jsonObj[VCLSubmissionResult.KeyExchange];
        return new VCLSubmissionResult(
            new VCLToken(jsonObj[VCLSubmissionResult.KeyToken]),
            this.parseExchange(exchangeJsonObj),
            jti,
            submissionId
        );
    }
}
