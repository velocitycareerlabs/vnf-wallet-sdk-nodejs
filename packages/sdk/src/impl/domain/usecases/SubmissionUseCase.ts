import { Nullish } from "../../../Nullish";
import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLResult from "../../../api/entities/VCLResult";
import VCLSubmission from "../../../api/entities/VCLSubmission";
import VCLSubmissionResult from "../../../api/entities/VCLSubmissionResult";

export default interface SubmissionUseCase {
    submit(
        submission: VCLSubmission,
        didJwk: Nullish<VCLDidJwk>
    ): Promise<VCLResult<VCLSubmissionResult>>;
}
