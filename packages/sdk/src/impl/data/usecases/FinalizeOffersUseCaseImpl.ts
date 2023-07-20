import VCLError from "../../../api/entities/VCLError";
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
    finalizeOffers(
        token: VCLToken,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        completionBlock: (r: VCLResult<VCLJwtVerifiableCredentials>) => any
    ): void {
        const passedCredentials: VCLJwt[] = [];
        const failedCredentials: VCLJwt[] = [];

        this.finalizeOffersRepository.finalizeOffers(
            token,
            finalizeOffersDescriptor,
            (encodedJwtOffersListResult) => {
                encodedJwtOffersListResult.handleResult(
                    (encodedJwtOffers) => {
                        encodedJwtOffers.forEach((encodedJwtOffer) => {
                            this.jwtServiceRepository.decode(
                                encodedJwtOffer,
                                (jwtResult) => {
                                    jwtResult.handleResult(
                                        (jwt) => {
                                            if (
                                                this.verifyJwtCredential(
                                                    jwt,
                                                    finalizeOffersDescriptor
                                                )
                                            ) {
                                                passedCredentials.push(jwt);
                                            } else {
                                                failedCredentials.push(jwt);
                                            }
                                            if (
                                                encodedJwtOffers.length ==
                                                passedCredentials.length +
                                                    failedCredentials.length
                                            ) {
                                                completionBlock(
                                                    new VCLResult.Success(
                                                        new VCLJwtVerifiableCredentials(
                                                            passedCredentials,
                                                            failedCredentials
                                                        )
                                                    )
                                                );
                                            }
                                        },
                                        (error) => {
                                            this.onError(
                                                error,
                                                completionBlock
                                            );
                                        }
                                    );
                                }
                            );
                        });

                        if (encodedJwtOffers.length === 0) {
                            completionBlock(
                                new VCLResult.Success(
                                    new VCLJwtVerifiableCredentials(
                                        passedCredentials,
                                        failedCredentials
                                    )
                                )
                            );
                        }
                    },
                    (error) => {
                        this.onError(error, completionBlock);
                    }
                );
            }
        );
    }

    private verifyJwtCredential(
        jwtCredential: VCLJwt,
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor
    ): boolean {
        return jwtCredential.payload["iss"] == finalizeOffersDescriptor.did;
    }

    private onError(
        error: VCLError,
        completionBlock: (r: VCLResult<VCLJwtVerifiableCredentials>) => any
    ) {
        completionBlock(new VCLResult.Error(error));
    }
}
