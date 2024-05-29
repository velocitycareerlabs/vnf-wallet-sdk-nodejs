import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLToken from "../../../api/entities/VCLToken";
import VCLJwt from "../../../api/entities/VCLJwt";

export default interface FinalizeOffersRepository {
    finalizeOffers(
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        sessionToken: VCLToken
    ): Promise<VCLJwt[]>;
}
