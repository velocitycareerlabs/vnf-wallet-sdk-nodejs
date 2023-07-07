// package io.velocitycareerlabs.impl.domain.repositories

import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";

export default interface FinalizeOffersRepository {
    finalizeOffers(
        token: VCLToken,
        proof: VCLJwt,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        completionBlock: (r: VCLResult<string[]>) => any
    ): void;
}
