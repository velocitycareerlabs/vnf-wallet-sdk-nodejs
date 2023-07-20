import VCL from "../api/VCL";
import VCLCountries from "../api/entities/VCLCountries";
import VCLCredentialManifest from "../api/entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "../api/entities/VCLCredentialManifestDescriptor";
import VCLCredentialTypeSchemas from "../api/entities/VCLCredentialTypeSchemas";
import VCLCredentialTypes from "../api/entities/VCLCredentialTypes";
import VCLCredentialTypesUIFormSchema from "../api/entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLDidJwk from "../api/entities/VCLDidJwk";
import VCLError from "../api/entities/VCLError";
import VCLExchange from "../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../api/entities/VCLExchangeDescriptor";
import VCLFinalizeOffersDescriptor from "../api/entities/VCLFinalizeOffersDescriptor";
import VCLGenerateOffersDescriptor from "../api/entities/VCLGenerateOffersDescriptor";
import VCLIdentificationSubmission from "../api/entities/VCLIdentificationSubmission";
import VCLInitializationDescriptor from "../api/entities/VCLInitializationDescriptor";
import VCLJwkPublic from "../api/entities/VCLJwkPublic";
import VCLJwt from "../api/entities/VCLJwt";
import VCLJwtDescriptor from "../api/entities/VCLJwtDescriptor";
import VCLJwtVerifiableCredentials from "../api/entities/VCLJwtVerifiableCredentials";
import VCLOffers from "../api/entities/VCLOffers";
import VCLOrganizations from "../api/entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "../api/entities/VCLOrganizationsSearchDescriptor";
import VCLPresentationRequest from "../api/entities/VCLPresentationRequest";
import VCLPresentationRequestDescriptor from "../api/entities/VCLPresentationRequestDescriptor";
import VCLPresentationSubmission from "../api/entities/VCLPresentationSubmission";
import VCLServiceType from "../api/entities/VCLServiceType";
import VCLServiceTypes from "../api/entities/VCLServiceTypes";
import VCLSubmissionResult from "../api/entities/VCLSubmissionResult";
import VCLToken from "../api/entities/VCLToken";
import VCLVerifiedProfile from "../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../api/entities/VCLVerifiedProfileDescriptor";
import VclBlocksProvider from "./VclBlocksProvider";
import { ProfileServiceTypeVerifier } from "./utils/ProfileServiceTypeVerifier";
import PromiseConverter from "./utils/PromiseConverter";
import VCLLog from "./utils/VCLLog";

export class VCLImpl implements VCL {
    static TAG = VCLImpl.name;

    countries: Nullish<VCLCountries>;
    credentialTypes: Nullish<VCLCredentialTypes>;
    credentialTypeSchemas: Nullish<VCLCredentialTypeSchemas>;
    verifiedProfileUseCase = VclBlocksProvider.provideVerifiedProfileUseCase();
    jwtServiceUseCase = VclBlocksProvider.provideJwtServiceUseCase();
    profileServiceTypeVerifier = new ProfileServiceTypeVerifier(
        this.verifiedProfileUseCase
    );

    identificationUseCase = VclBlocksProvider.provideIdentificationUseCase();

    presentationRequestUseCase =
        VclBlocksProvider.providePresentationRequestUseCase();

    credentialManifestUseCase =
        VclBlocksProvider.provideCredentialManifestUseCase();

    generateOffersUseCase = VclBlocksProvider.provideGenerateOffersUseCase();
    finalizeOffersUseCase = VclBlocksProvider.provideFinalizeOffersUseCase();
    presentationSubmissionUseCase =
        VclBlocksProvider.providePresentationSubmissionUseCase();

    exchangeProgressUseCase =
        VclBlocksProvider.provideExchangeProgressUseCase();

    organizationsUseCase = VclBlocksProvider.provideOrganizationsUseCase();

    initialize(
        initializationDescriptor: VCLInitializationDescriptor,
        successHandler: () => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }

    getPresentationRequest = (
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (r: VCLPresentationRequest) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                const did = presentationRequestDescriptor.did;
                if (!did) {
                    let err = new VCLError(
                        "did was not found in $presentationRequestDescriptor"
                    );
                    logError("getPresentationRequest::verifiedProfile", err);
                    errorHandler(err);
                    return;
                }

                this.profileServiceTypeVerifier.verifyServiceTypeOfVerifiedProfile(
                    new VCLVerifiedProfileDescriptor(did),
                    new VCLServiceTypes([VCLServiceType.Inspector]),
                    () => {
                        this.presentationRequestUseCase.getPresentationRequest(
                            presentationRequestDescriptor,
                            (presentationRequestResult) => {
                                presentationRequestResult.handleResult(
                                    (it) => successHandler(it),
                                    (it) => {
                                        logError("getPresentationRequest", it);
                                        errorHandler(it);
                                    }
                                );
                            }
                        );
                    },
                    (it) => {
                        logError("profile verification failed", it);
                        errorHandler(it);
                    }
                );
            }
        );

    submitPresentation = (presentationSubmission: VCLPresentationSubmission) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (r: VCLSubmissionResult) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.presentationSubmissionUseCase.submit(
                    presentationSubmission,
                    (presentationSubmissionResult) => {
                        presentationSubmissionResult.handleResult(
                            (it) => {
                                successHandler(it);
                            },
                            (it) => {
                                logError("submit presentation", it);
                                errorHandler(it);
                            }
                        );
                    }
                );
            }
        );

    getExchangeProgress = (exchangeDescriptor: VCLExchangeDescriptor) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (e: VCLExchange) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.exchangeProgressUseCase.getExchangeProgress(
                    exchangeDescriptor,
                    (presentationSubmissionResult) => {
                        presentationSubmissionResult.handleResult(
                            (it) => {
                                successHandler(it);
                            },
                            (it) => {
                                logError("getExchangeProgress", it);
                                errorHandler(it);
                            }
                        );
                    }
                );
            }
        );

    searchForOrganizations = (
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (o: VCLOrganizations) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.organizationsUseCase.searchForOrganizations(
                    organizationsSearchDescriptor,
                    (organization) => {
                        organization.handleResult(
                            (it) => {
                                successHandler(it);
                            },
                            (it) => {
                                logError("searchForOrganizations", it);
                                errorHandler(it);
                            }
                        );
                    }
                );
            }
        );

    getCredentialManifest = (
        credentialManifestDescriptor: VCLCredentialManifestDescriptor
    ) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (m: VCLCredentialManifest) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                let did = credentialManifestDescriptor.did;
                if (!did) {
                    let e = new VCLError(
                        `did was not found in ${credentialManifestDescriptor}`,
                        null,
                        null
                    );
                    errorHandler(e);
                    VCLLog.e(
                        VCLImpl.TAG,
                        "getCredentialManifest.verifiedProfile" +
                            JSON.stringify(e.toJsonObject())
                    );
                    return;
                }
                this.profileServiceTypeVerifier.verifyServiceTypeOfVerifiedProfile(
                    new VCLVerifiedProfileDescriptor(did),
                    VCLServiceTypes.fromIssuingType(
                        credentialManifestDescriptor.issuingType
                    ),
                    () => {
                        this.credentialManifestUseCase.getCredentialManifest(
                            credentialManifestDescriptor,
                            (credentialManifest) => {
                                credentialManifest.handleResult(
                                    (it) => successHandler(it),
                                    (it) => {
                                        logError("getCredentialManifest", it);
                                        errorHandler(it);
                                    }
                                );
                            }
                        );
                    },
                    (it) => {
                        logError("profile verification failed", it);
                        errorHandler(it);
                    }
                );
            }
        );
    generateOffers = (generateOffersDescriptor: VCLGenerateOffersDescriptor) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (o: VCLOffers) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                const identificationSubmission =
                    new VCLIdentificationSubmission(
                        generateOffersDescriptor.credentialManifest,
                        generateOffersDescriptor.identificationVerifiableCredentials
                    );

                this.identificationUseCase.submit(
                    identificationSubmission,
                    (identificationSubmissionResult) => {
                        identificationSubmissionResult.handleResult(
                            (submission) => {
                                this.invokeGenerateOffersUseCase(
                                    generateOffersDescriptor,
                                    submission.token,
                                    successHandler,
                                    errorHandler
                                );
                            },
                            (error) => {
                                logError("submit identification", error);
                                errorHandler(error);
                            }
                        );
                    }
                );
            }
        );
    checkForOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    finalizeOffers = (
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        token: VCLToken
    ) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (c: VCLJwtVerifiableCredentials) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.finalizeOffersUseCase.finalizeOffers(
                    token,
                    finalizeOffersDescriptor,
                    (jwtVerifiableCredentials) => {
                        jwtVerifiableCredentials.handleResult(
                            (it) => successHandler(it),
                            (err) => {
                                logError("finalizeOffers", err);
                                errorHandler(err);
                            }
                        );
                    }
                );
            }
        );

    getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        successHandler: (s: VCLCredentialTypesUIFormSchema) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }

    getVerifiedProfile = (
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor
    ) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (p: VCLVerifiedProfile) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.verifiedProfileUseCase.getVerifiedProfile(
                    verifiedProfileDescriptor,
                    (verifiedProfileResult) => {
                        verifiedProfileResult.handleResult(
                            (it) => successHandler(it),
                            (error) => {
                                logError("getVerifiedProfile", error);
                                errorHandler(error);
                            }
                        );
                    }
                );
            }
        );

    verifyJwt = (jwt: VCLJwt, jwkPublic: VCLJwkPublic) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (b: boolean) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.jwtServiceUseCase.verifyJwt(
                    jwt,
                    jwkPublic,
                    (isVerifiedResult) => {
                        isVerifiedResult.handleResult(
                            (it) => {
                                successHandler(it);
                            },
                            (it) => {
                                logError("verifyJwt", it);
                                errorHandler(it);
                            }
                        );
                    }
                );
            }
        );

    generateSignedJwt = (jwtDescriptor: VCLJwtDescriptor) =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (jwt: VCLJwt) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.jwtServiceUseCase.generateSignedJwt(
                    jwtDescriptor,
                    (jwtResult) => {
                        jwtResult.handleResult(successHandler, (it) => {
                            logError("generateSignedJwt", it);
                            errorHandler(it);
                        });
                    }
                );
            }
        );

    generateDidJwk = () =>
        PromiseConverter.MethodToPromise(
            (
                successHandler: (jwk: VCLDidJwk) => any,
                errorHandler: (e: VCLError) => any
            ) => {
                this.jwtServiceUseCase.generateDidJwk(null, (didJwkResult) => {
                    didJwkResult.handleResult(successHandler, (it) => {
                        logError("generateDidJwk", it);
                        errorHandler(it);
                    });
                });
            }
        );

    printVersion(): void {
        throw new Error("Method not implemented.");
    }

    private invokeGenerateOffersUseCase(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ) {
        this.generateOffersUseCase.generateOffers(
            token,
            generateOffersDescriptor,
            (vnOffersResult) => {
                vnOffersResult.handleResult(
                    (it) => successHandler(it),
                    (err) => {
                        logError("generateOffers", err);
                        errorHandler(err);
                    }
                );
            }
        );
    }
}

const logError = (message: String = "", error: VCLError) => {
    VCLLog.e(VCLImpl.TAG, `${message}: ${error.toJsonObject()}`);
};
