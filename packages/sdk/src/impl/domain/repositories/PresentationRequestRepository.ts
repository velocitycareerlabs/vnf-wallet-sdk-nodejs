// package io.velocitycareerlabs.impl.domain.repositories

import VCLPresentationRequestDescriptor from "../../../api/entities/VCLPresentationRequestDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface PresentationRequestRepository {
    getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<string>>;
}
