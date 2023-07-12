// package io.velocitycareerlabs.impl.domain.repositories

import VCLJwt from "../../../api/entities/VCLJwt";
import VCLResult from "../../../api/entities/VCLResult";
import VCLSubmission from "../../../api/entities/VCLSubmission";
import VCLSubmissionResult from "../../../api/entities/VCLSubmissionResult";

export default interface SubmissionRepository {
    submit(
        submission: VCLSubmission,
        jwt: VCLJwt,
        completionBlock: (r: VCLResult<VCLSubmissionResult>) => any
    ): void;
}
