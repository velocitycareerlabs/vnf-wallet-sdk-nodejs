import VCLError from "../../../api/entities/error/VCLError";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtVerifiableCredentials from "../../../api/entities/VCLJwtVerifiableCredentials";
import VCLResult from "../../../api/entities/VCLResult";
import VCLToken from "../../../api/entities/VCLToken";
import FinalizeOffersRepository from "../../domain/repositories/FinalizeOffersRepository";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";
import FinalizeOffersUseCase from "../../domain/usecases/FinalizeOffersUseCase";

export default class FinalizeOffersUseCaseImpl
    implements FinalizeOffersUseCase
{
    constructor(
        private finalizeOffersRepository: FinalizeOffersRepository,
        private jwtServiceRepository: JwtServiceRepository
    ) {}
    async finalizeOffers(
        token: VCLToken,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor
    ): Promise<VCLResult<VCLJwtVerifiableCredentials>> {
        const passedCredentials: VCLJwt[] = [];
        const failedCredentials: VCLJwt[] = [];

        const encodedJwtOffersListResult =
            await this.finalizeOffersRepository.finalizeOffers(
                token,
                finalizeOffersDescriptor
            );
        const [error, encodedJwtOffers] =
            await encodedJwtOffersListResult.handleResult();

        if (error) {
            return new VCLResult.Error(error);
        }

        for (const encodedJwtOffer of encodedJwtOffers!) {
            const jwtResult = await this.jwtServiceRepository.decode(
                encodedJwtOffer
            );
            const [error, jwt] = await jwtResult.handleResult();
            if (error) {
                return new VCLResult.Error(error);
            }
            if (!jwt) {
                return new VCLResult.Error(
                    new VCLError("Error occured while parsing jwt.")
                );
            }

            if (this.verifyJwtCredential(jwt, finalizeOffersDescriptor)) {
                passedCredentials.push(jwt);
            } else {
                failedCredentials.push(jwt);
            }

            if (
                encodedJwtOffers!.length ==
                passedCredentials.length + failedCredentials.length
            ) {
                return new VCLResult.Success(
                    new VCLJwtVerifiableCredentials(
                        passedCredentials,
                        failedCredentials
                    )
                );
            }
        }

        return new VCLResult.Success(
            new VCLJwtVerifiableCredentials(
                passedCredentials,
                failedCredentials
            )
        );
    }

    private verifyJwtCredential(
        jwtCredential: VCLJwt,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor
    ): boolean {
        return jwtCredential.payload["iss"] == finalizeOffersDescriptor.did;
    }
}
