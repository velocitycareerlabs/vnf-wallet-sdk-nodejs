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
    submit(
        submission: VCLSubmission,
        jwt: VCLJwt,
        completionBlock: (r: VCLResult<VCLSubmissionResult>) => any
    ): void {
        this.networkService.sendRequestRaw({
            endpoint: submission.submitUri,
            body: submission.generateRequestBody(jwt),
            method: "POST",
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            contentType: "application/json",
            completionBlock: (result) => {
                result.handleResult(
                    (submissionResponse) => {
                        try {
                            const jsonObj = submissionResponse.payload;
                            const submissionResult = this.parse(
                                jsonObj,
                                submission.jti,
                                submission.submissionId
                            );
                            completionBlock(
                                new VCLResult.Success(submissionResult)
                            );
                        } catch (error) {}
                    },
                    (error) => {
                        completionBlock(new VCLResult.Error(error));
                    }
                );
            },
            useCaches: false,
        });
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
