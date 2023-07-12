// package io.velocitycareerlabs.impl.domain.repositories

import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import VCLResult from "../../../api/entities/VCLResult";

export default interface CredentialTypesRepository {
    getCredentialTypes(
        cacheSequence: number,
        completionBlock: (r: VCLResult<VCLCredentialTypes>) => any
    ): void;
}
