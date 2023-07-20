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
    submit(
        submission: VCLSubmission,
        completionBlock: (r: VCLResult<VCLSubmissionResult>) => any
    ): void {
        this.jwtServiceRepository.generateSignedJwt(
            new VCLJwtDescriptor(
                submission.payload,
                submission.iss,
                submission.jti
            ),
            (signedJwtResult: VCLResult<VCLJwt>) => {
                signedJwtResult.handleResult(
                    (jwt) => {
                        this.submissionRepository.submit(
                            submission,
                            jwt,
                            (
                                submissionResult: VCLResult<VCLSubmissionResult>
                            ) => {
                                completionBlock(submissionResult);
                            }
                        );
                    },
                    (error) => {
                        completionBlock(new VCLResult.Error(error));
                    }
                );
            }
        );
    }
}
