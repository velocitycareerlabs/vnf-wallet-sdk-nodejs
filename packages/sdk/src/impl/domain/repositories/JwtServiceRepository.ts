// package io.velocitycareerlabs.impl.domain.repositories

import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLPublicJwk from "../../../api/entities/VCLPublicJwk";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface JwtServiceRepository {
    decode(encodedJwt: string): Promise<VCLResult<VCLJwt>>;

    verifyJwt(
        jwt: VCLJwt,
        publicJwk: VCLPublicJwk
    ): Promise<VCLResult<boolean>>;

    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        nonce: string | null | undefined,
        didJwk: VCLDidJwk | null | undefined
    ): Promise<VCLResult<VCLJwt>>;
}
