import VCLPresentationRequest from "../../../api/entities/VCLPresentationRequest";
import VCLPresentationRequestDescriptor from "../../../api/entities/VCLPresentationRequestDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface PresentationRequestUseCase {
    getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLResult<VCLPresentationRequest>>;
}
