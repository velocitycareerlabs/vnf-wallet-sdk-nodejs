import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import VCLSubmission from "../../../api/entities/VCLSubmission";
import VCLSubmissionResult from "../../../api/entities/VCLSubmissionResult";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import SubmissionRepository from "../../domain/repositories/SubmissionRepository";
import SubmissionUseCase from "../../domain/usecases/SubmissionUseCase";

export default class SubmissionUseCaseImpl implements SubmissionUseCase {
    constructor(
        private submissionRepository: SubmissionRepository,
        private jwtServiceRepository: JwtServiceRepository
    ) {}
    async submit(
        submission: VCLSubmission,
        didJwk: Nullish<VCLDidJwk>
    ): Promise<VCLResult<VCLSubmissionResult>> {
        let signedJwtResult = await this.jwtServiceRepository.generateSignedJwt(
            new VCLJwtDescriptor(
                submission.generatePayload(),
                submission.iss,
                submission.jti,
                didJwk?.keyId
            ),
            null,
            didJwk
        );

        let [error, jwt] = await signedJwtResult.handleResult();

        if (error) {
            return new VCLResult.Error(error);
        }
        let submissionResult = await this.submissionRepository.submit(
            submission,
            jwt!
        );

        return submissionResult;
    }
}
