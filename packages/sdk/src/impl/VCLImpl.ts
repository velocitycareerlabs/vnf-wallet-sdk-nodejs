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
import VCLSubmissionResult from "../api/entities/VCLSubmissionResult";
import VCLToken from "../api/entities/VCLToken";
import VCLVerifiedProfile from "../api/entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "../api/entities/VCLVerifiedProfileDescriptor";
import VclBlocksProvider from "./VclBlocksProvider";
import FinalizeOffersUseCase from "./domain/usecases/FinalizeOffersUseCase";
import GenerateOffersUseCase from "./domain/usecases/GenerateOffersUseCase";
import { IdentificationSubmissionUseCase } from "./domain/usecases/IdentificationSubmissionUseCase";
import VCLLog from "./utils/VCLLog";

export class VCLImpl implements VCL {
    static TAG = VCLImpl.name;

    countries: Nullish<VCLCountries>;
    credentialTypes: Nullish<VCLCredentialTypes>;
    credentialTypeSchemas: Nullish<VCLCredentialTypeSchemas>;
    verifiedProfileUseCase = VclBlocksProvider.provideVerifiedProfileUseCase();

    private identificationSubmissionUseCase: Nullish<IdentificationSubmissionUseCase>;
    private generateOffersUseCase: Nullish<GenerateOffersUseCase>;
    private finalizeOffersUseCase: Nullish<FinalizeOffersUseCase>;

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
        }
        throw new Error("Method not implemented.");
    }

    generateOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        didJwk: VCLDidJwk,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        const identificationSubmission = new VCLIdentificationSubmission(
            generateOffersDescriptor.credentialManifest,
            generateOffersDescriptor.identificationVerifiableCredentials
        );

        this.identificationSubmissionUseCase?.submit(
            identificationSubmission,
            didJwk,
            (identificationSubmissionResult) => {
                identificationSubmissionResult.handleResult(
                    (identificationSubmission) => {
                        this.invokeGenerateOffersUseCase(
                            generateOffersDescriptor,
                            identificationSubmission.token,
                            successHandler,
                            errorHandler
                        );
                    },
                    (e) => {
                        logError("submit identification", e);
                        errorHandler(e);
                    }
                );
            }
        );
    }

    invokeGenerateOffersUseCase(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        this.generateOffersUseCase?.generateOffers(
            token,
            generateOffersDescriptor,
            (vnOffersResult) => {
                vnOffersResult.handleResult(
                    (it) => {
                        successHandler(it);
                    },
                    (e) => {
                        logError("generateOffers", e);
                        errorHandler(e);
                    }
                );
            }
        );
    }

    checkForOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        this.invokeGenerateOffersUseCase(
            generateOffersDescriptor,
            token,
            successHandler,
            errorHandler
        );
    }

    finalizeOffers(
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        didJwk: VCLDidJwk,
        token: VCLToken,
        successHandler: (c: VCLJwtVerifiableCredentials) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        this.finalizeOffersUseCase?.finalizeOffers(
            finalizeOffersDescriptor,
            didJwk,
            token,
            (jwtVerifiableCredentialsResult) => {
                jwtVerifiableCredentialsResult.handleResult(
                    (it) => {
                        successHandler(it);
                    },
                    (e) => {
                        logError("finalizeOffers", e);
                        errorHandler(e);
                    }
                );
            }
        );
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
        throw new Error("Method not implemented.");
    }
    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        successHandler: (jwt: VCLJwt) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    generateDidJwk(
        successHandler: (jwk: VCLDidJwk) => any,
        errorHandler: (e: VCLError) => any
    ): void {
        throw new Error("Method not implemented.");
    }
    printVersion(): void {
        throw new Error("Method not implemented.");
    }
}

const logError = (message: String = "", error: VCLError) => {
    VCLLog.e(VCLImpl.TAG, `${message}: ${error.toJsonObject()}`);
};
