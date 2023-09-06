// package io.velocitycareerlabs.impl.domain.repositories

import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLResult from "../../../api/entities/VCLResult";

export default interface KeyServiceRepository {
    generateDidJwk(completionBlock: (r: VCLResult<VCLDidJwk>) => any): void;
}
