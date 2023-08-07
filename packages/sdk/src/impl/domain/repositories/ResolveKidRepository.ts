// package io.velocitycareerlabs.impl.domain.repositories

import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLResult from "../../../api/entities/VCLResult";

export default interface ResolveKidRepository {
    getPublicKey(kid: string): Promise<VCLResult<VCLJwkPublic>>;
}
