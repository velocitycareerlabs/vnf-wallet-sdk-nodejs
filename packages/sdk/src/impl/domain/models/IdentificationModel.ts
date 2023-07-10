import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLIdentificationSubmission from "../../../api/entities/VCLIdentificationSubmission";
import VCLResult from "../../../api/entities/VCLResult";
import VCLSubmissionResult from "../../../api/entities/VCLSubmissionResult";
import VCLToken from "../../../api/entities/VCLToken";
import Model from "./Model";

export default interface IdentificationModel extends Model<VCLToken> {
    submit(
        identificationSubmission: VCLIdentificationSubmission,
        didJwk: VCLDidJwk,
        completionBlock: (r: VCLResult<VCLSubmissionResult>) => any
    ): void;
}
