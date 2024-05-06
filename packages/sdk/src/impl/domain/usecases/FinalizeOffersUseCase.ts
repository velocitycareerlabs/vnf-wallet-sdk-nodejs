import { Nullish } from "../../../types";
import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLJwtVerifiableCredentials from "../../../api/entities/VCLJwtVerifiableCredentials";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";

export default interface FinalizeOffersUseCase {
    finalizeOffers(
        token: VCLToken,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        didJwk: Nullish<VCLDidJwk>
    ): Promise<VCLResult<VCLJwtVerifiableCredentials>>;
}
