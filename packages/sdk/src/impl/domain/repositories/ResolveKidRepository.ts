// package io.velocitycareerlabs.impl.domain.repositories

import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLResult from "../../../api/entities/VCLResult";

export default interface ResolveKidRepository {
    getPublicKey(kid: string): Promise<VCLResult<VCLPublicJwk>>;
}
