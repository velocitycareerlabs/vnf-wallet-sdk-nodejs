// package io.velocitycareerlabs.impl.domain.repositories

import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface JwtServiceRepository {
    decode(
        encodedJwt: string,
        complectionBlock: (r: VCLResult<VCLJwt>) => any
    ): void;
    verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLJwkPublic,
        complectionBlock: (r: VCLResult<boolean>) => any
    ): void;
    generateSignedJwt(
        kid: string | null,
        nonce: string | null,
        jwtDescriptor: VCLJwtDescriptor,
        complectionBlock: (r: VCLResult<VCLJwt>) => any
    ): void;
}
