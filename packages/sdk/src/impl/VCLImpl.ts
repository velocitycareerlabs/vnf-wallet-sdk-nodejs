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
import VCLServiceTypes from "../api/entities/VCLServiceTypes";
import VCLSubmissionResult from "../api/entities/VCLSubmissionResult";
import VCLToken from "../api/entities/VCLToken";
import VCLVerifiedProfile from "../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../api/entities/VCLVerifiedProfileDescriptor";
import VclBlocksProvider from "./VclBlocksProvider";
import { ProfileServiceTypeVerifier } from "./utils/ProfileServiceTypeVerifier";
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

    credentialManifestUseCase =
        VclBlocksProvider.provideCredentialManifestUseCase();

    initialize(
        initializationDescriptor: VCLInitializationDescriptor,
        successHandler: () => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }

    getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor,
        successHandler: (r: VCLPresentationRequest) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    submitPresentation(
        presentationSubmission: VCLPresentationSubmission,
        successHandler: (r: VCLSubmissionResult) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor,
        successHandler: (e: VCLExchange) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor,
        successHandler: (o: VCLOrganizations) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }

    getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor,
        successHandler: (m: VCLCredentialManifest) => any,
        errorHandler: (e: VCLError) => any
    ): void {
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
    generateOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    checkForOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    finalizeOffers(
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        token: VCLToken,
        successHandler: (c: VCLJwtVerifiableCredentials) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        successHandler: (s: VCLCredentialTypesUIFormSchema) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    getVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
        successHandler: (p: VCLVerifiedProfile) => any,
        errorHandler: (e: VCLError) => any
    ): void {
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
    verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLJwkPublic,
        successHandler: (b: boolean) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        this.jwtServiceUseCase.verifyJwt(jwt, jwkPublic, (isVerifiedResult) => {
            isVerifiedResult.handleResult(
                (it) => {
                    successHandler(it);
                },
                (it) => {
                    logError("verifyJwt", it);
                    errorHandler(it);
                }
            );
        });
    }
    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        successHandler: (jwt: VCLJwt) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        this.jwtServiceUseCase.generateSignedJwt(jwtDescriptor, (jwtResult) => {
            jwtResult.handleResult(successHandler, (it) => {
                logError("generateSignedJwt", it);
                errorHandler(it);
            });
        });
    }

    generateDidJwk(
        successHandler: (jwk: VCLDidJwk) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        this.jwtServiceUseCase.generateDidJwk(null, (didJwkResult) => {
            didJwkResult.handleResult(successHandler, (it) => {
                logError("generateDidJwk", it);
                errorHandler(it);
            });
        });
    }
    printVersion(): void {
        throw new Error("Method not implemented.");
    }
}

const logError = (message: String = "", error: VCLError) => {
    VCLLog.e(VCLImpl.TAG, `${message}: ${error.toJsonObject()}`);
};
