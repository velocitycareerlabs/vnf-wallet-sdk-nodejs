import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtVerifiableCredentials from "../../../api/entities/VCLJwtVerifiableCredentials";
import VCLToken from "../../../api/entities/VCLToken";
import FinalizeOffersRepository from "../../domain/repositories/FinalizeOffersRepository";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import FinalizeOffersUseCase from "../../domain/usecases/FinalizeOffersUseCase";

export default class FinalizeOffersUseCaseImpl
    implements FinalizeOffersUseCase {
    constructor(
        private finalizeOffersRepository: FinalizeOffersRepository,
        private jwtServiceRepository: JwtServiceRepository
    ) {
    }

    async finalizeOffers(
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        sessionToken: VCLToken,
    ): Promise<VCLJwtVerifiableCredentials> {
        const passedCredentials: VCLJwt[] = [];
        const failedCredentials: VCLJwt[] = [];
        try {
            const jwtCredentialsList = await this.finalizeOffersRepository.finalizeOffers(
                finalizeOffersDescriptor,
                sessionToken,
            );
            for (const jwtCredential of jwtCredentialsList) {
                if (this.verifyJwtCredential(jwtCredential, finalizeOffersDescriptor)) {
                    passedCredentials.push(jwtCredential);
                } else {
                    failedCredentials.push(jwtCredential);
                }

                if (jwtCredentialsList.length == passedCredentials.length + failedCredentials.length) {
                    return new VCLJwtVerifiableCredentials(passedCredentials, failedCredentials);
                }
            }
            return new VCLJwtVerifiableCredentials(passedCredentials, failedCredentials);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    private verifyJwtCredential(
        jwtCredential: VCLJwt,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor
    ): boolean {
        return jwtCredential.payload["iss"] == finalizeOffersDescriptor.did;
    }
}
