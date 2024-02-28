import VCL from "../api/VCL";
import VCLEnvironment from "../api/VCLEnvironment";
import VCLCountries from "../api/entities/VCLCountries";
import VCLCredentialManifest from "../api/entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "../api/entities/VCLCredentialManifestDescriptor";
import VCLCredentialTypeSchemas from "../api/entities/VCLCredentialTypeSchemas";
import VCLCredentialTypes from "../api/entities/VCLCredentialTypes";
import VCLCredentialTypesUIFormSchema from "../api/entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLDidJwk from "../api/entities/VCLDidJwk";
import VCLError from "../api/entities/error/VCLError";
import VCLExchange from "../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../api/entities/VCLExchangeDescriptor";
import VCLFinalizeOffersDescriptor from "../api/entities/VCLFinalizeOffersDescriptor";
import VCLGenerateOffersDescriptor from "../api/entities/VCLGenerateOffersDescriptor";
import VCLIdentificationSubmission from "../api/entities/VCLIdentificationSubmission";
import VCLInitializationDescriptor from "../api/entities/VCLInitializationDescriptor";
import VCLPublicJwk from "../api/entities/VCLPublicJwk";
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
import GlobalConfig from "./GlobalConfig";
import VclBlocksProvider from "./VclBlocksProvider";
import CountriesModel from "./domain/models/CountriesModel";
import CredentialTypeSchemasModel from "./domain/models/CredentialTypeSchemasModel";
import CredentialTypesModel from "./domain/models/CredentialTypesModel";
import InitializationWatcher from "./utils/InitializationWatcher";
import { ProfileServiceTypeVerifier } from "./utils/ProfileServiceTypeVerifier";
import PromiseConverter from "./utils/PromiseConverter";
import VCLLog from "./utils/VCLLog";
import "./extensions/DateExtensions";
import "./extensions/StringExtensions";
import "./extensions/ListExtensions";
import VCLResult from "../api/entities/VCLResult";
import VCLErrorCode from "../api/entities/error/VCLErrorCode";
import VerifiedProfileUseCase from "./domain/usecases/VerifiedProfileUseCase";
import JwtServiceUseCase from "./domain/usecases/JwtServiceUseCase";
import IdentificationSubmissionUseCase from "./domain/usecases/IdentificationSubmissionUseCase";
import PresentationRequestUseCase from "./domain/usecases/PresentationRequestUseCase";
import CredentialManifestUseCase from "./domain/usecases/CredentialManifestUseCase";
import GenerateOffersUseCase from "./domain/usecases/GenerateOffersUseCase";
import FinalizeOffersUseCase from "./domain/usecases/FinalizeOffersUseCase";
import PresentationSubmissionUseCase from "./domain/usecases/PresentationSubmissionUseCase";
import ExchangeProgressUseCase from "./domain/usecases/ExchangeProgressUseCase";
import OrganizationsUseCase from "./domain/usecases/OrganizationsUseCase";
import CredentialTypesUIFormSchemaUseCase from "./domain/usecases/CredentialTypesUIFormSchemaUseCase";
export class VCLImpl implements VCL {
    static TAG = VCLImpl.name;

    static readonly ModelsToInitializeAmount = 3;

    countries: Nullish<VCLCountries>;
    credentialTypes: Nullish<VCLCredentialTypes>;
    credentialTypesModel: Nullish<CredentialTypesModel>;
    credentialTypeSchemas: Nullish<VCLCredentialTypeSchemas>;

    initializationDescriptor!: VCLInitializationDescriptor;

    credentialTypeSchemasModel: Nullish<CredentialTypeSchemasModel>;
    countriesModel: Nullish<CountriesModel>;

    verifiedProfileUseCase!: VerifiedProfileUseCase;

    jwtServiceUseCase!: JwtServiceUseCase;
    profileServiceTypeVerifier!: ProfileServiceTypeVerifier;

    identificationUseCase!: IdentificationSubmissionUseCase;

    presentationRequestUseCase!: PresentationRequestUseCase;

    credentialManifestUseCase!: CredentialManifestUseCase;

    generateOffersUseCase!: GenerateOffersUseCase;
    finalizeOffersUseCase!: FinalizeOffersUseCase;

    presentationSubmissionUseCase!: PresentationSubmissionUseCase;

    exchangeProgressUseCase!: ExchangeProgressUseCase;

    organizationsUseCase!: OrganizationsUseCase;

    credentialTypesUIFormSchemaUseCase!: CredentialTypesUIFormSchemaUseCase;

    private initializationWatcher = new InitializationWatcher(
        VCLImpl.ModelsToInitializeAmount
    );

    // TODO: figure out a way to convert to promise
    async initialize(
        initializationDescriptor: VCLInitializationDescriptor
    ): Promise<Nullish<VCLError>> {
        GlobalConfig.CurrentEnvironment = initializationDescriptor.environment;
        this.initializationDescriptor = initializationDescriptor;
        this.initializationWatcher = new InitializationWatcher(
            VCLImpl.ModelsToInitializeAmount
        );

        const completionHandler = (e?: any) => {
            if (e) return e;
            let firstError = this.initializationWatcher.firstError();
            return firstError;
        };

        this.credentialTypesModel =
            VclBlocksProvider.provideCredentialTypesModel();

        this.countriesModel = VclBlocksProvider.provideCountryCodesModel();

        let initializeCountriesError = await this.countriesModel.initialize();
        this.initializationWatcher.onInitializedModel(initializeCountriesError);

        let initalizeCredentialTypesError =
            await this.credentialTypesModel.initialize();

        if (
            initalizeCredentialTypesError &&
            this.initializationWatcher.onInitializedModel(
                initalizeCredentialTypesError,
                true
            )
        ) {
            return completionHandler();
        }

        if (this.initializationWatcher.onInitializedModel(null)) {
            return completionHandler();
        } else {
            if (this.credentialTypesModel?.data) {
                let credentialTypes = this.credentialTypesModel.data!;
                this.credentialTypeSchemasModel =
                    VclBlocksProvider.provideCredentialTypeSchemasModel(
                        credentialTypes
                    );
                let initializeCredentialTypeSchemasError =
                    await this.credentialTypeSchemasModel.initialize();

                if (
                    this.initializationWatcher.onInitializedModel(
                        initalizeCredentialTypesError
                    )
                ) {
                    return completionHandler();
                }
            } else {
                return completionHandler(
                    new VCLError("Failed to get credential type schemas")
                );
            }
        }
    }

    private initializeUseCases() {
        this.verifiedProfileUseCase =
            VclBlocksProvider.provideVerifiedProfileUseCase();
        this.jwtServiceUseCase = VclBlocksProvider.provideJwtServiceUseCase(
            this.initializationDescriptor.cryptoServicesDescriptor
        );
        this.profileServiceTypeVerifier = new ProfileServiceTypeVerifier(
            this.verifiedProfileUseCase
        );

        this.identificationUseCase =
            VclBlocksProvider.provideIdentificationUseCase(
                this.initializationDescriptor.cryptoServicesDescriptor
            );

        this.presentationRequestUseCase =
            VclBlocksProvider.providePresentationRequestUseCase(
                this.initializationDescriptor.cryptoServicesDescriptor
            );

        this.credentialManifestUseCase =
            VclBlocksProvider.provideCredentialManifestUseCase(
                this.initializationDescriptor.cryptoServicesDescriptor
            );

        this.generateOffersUseCase =
            VclBlocksProvider.provideGenerateOffersUseCase();
        this.finalizeOffersUseCase =
            VclBlocksProvider.provideFinalizeOffersUseCase(
                this.initializationDescriptor.cryptoServicesDescriptor
            );
        this.presentationSubmissionUseCase =
            VclBlocksProvider.providePresentationSubmissionUseCase(
                this.initializationDescriptor.cryptoServicesDescriptor
            );

        this.exchangeProgressUseCase =
            VclBlocksProvider.provideExchangeProgressUseCase();

        this.organizationsUseCase =
            VclBlocksProvider.provideOrganizationsUseCase();

        this.credentialTypesUIFormSchemaUseCase =
            VclBlocksProvider.provideCredentialTypesUIFormSchemaUseCase();
    }
    getPresentationRequest = async (
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ) => {
        const did = presentationRequestDescriptor.did;
        if (!did) {
            let err = new VCLError(
                `did was not found in ${JSON.stringify(
                    presentationRequestDescriptor
                )}`
            );
            logError("getPresentationRequest::verifiedProfile", err);
            throw err;
        }

        let profileVerification =
            await this.profileServiceTypeVerifier.verifyServiceTypeOfVerifiedProfile(
                new VCLVerifiedProfileDescriptor(did),
                new VCLServiceTypes([VCLServiceType.Inspector])
            );

        let [error, verificationResult] =
            await profileVerification.handleResult();
        if (error) {
            console.log(error);
            // logError("getPresentationRequest", error);
            logError("profile verification failed", error);
            throw error;
        }

        let presentationRequestResult: Nullish<
            VCLResult<VCLPresentationRequest>
        >;

        try {
            presentationRequestResult =
                await this.presentationRequestUseCase.getPresentationRequest(
                    presentationRequestDescriptor
                );
        } catch (error: any) {
            logError("getPresentationRequest", error);
            throw error;
        }

        let presentationRequest: Nullish<VCLPresentationRequest>;
        [error, presentationRequest] =
            await presentationRequestResult.handleResult();

        if (error) {
            throw error;
        }
        return presentationRequest!;
    };

    submitPresentation = async (
        presentationSubmission: VCLPresentationSubmission,
        didJwk: Nullish<VCLDidJwk>
    ) => {
        let presentationSubmissionSubmission =
            await this.presentationSubmissionUseCase.submit(
                presentationSubmission,
                didJwk
            );
        let [error, presentationSubmissionResult] =
            await presentationSubmissionSubmission.handleResult();

        if (error) {
            logError("submit presentation", error);
            throw error;
        }
        return presentationSubmissionResult!;
    };

    getExchangeProgress = async (exchangeDescriptor: VCLExchangeDescriptor) => {
        let exchangeProgressResult =
            await this.exchangeProgressUseCase.getExchangeProgress(
                exchangeDescriptor
            );

        let [error, exchangeProgress] =
            await exchangeProgressResult.handleResult();
        if (error) {
            logError("getExchangeProgress", error);
            throw error;
        }

        return exchangeProgress!;
    };

    searchForOrganizations = async (
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ) => {
        let organization =
            await this.organizationsUseCase.searchForOrganizations(
                organizationsSearchDescriptor
            );
        let [error, organizationResult] = await organization.handleResult();
        if (error) {
            logError("searchForOrganizations", error);
            throw error;
        }

        return organizationResult!;
    };

    getCredentialManifest = async (
        credentialManifestDescriptor: VCLCredentialManifestDescriptor
    ) => {
        let did = credentialManifestDescriptor.did;
        if (!did) {
            let error = new VCLError(
                `did was not found in ${JSON.stringify(
                    credentialManifestDescriptor
                )}`,
                VCLErrorCode.SdkError.toString(),
                null
            );
            VCLLog.e(
                VCLImpl.TAG,
                "getCredentialManifest.verifiedProfile" +
                    JSON.stringify(error.jsonObject)
            );
            throw error;
        }
        try {
            let verifiedProfileResult =
                await this.profileServiceTypeVerifier.verifyServiceTypeOfVerifiedProfile(
                    new VCLVerifiedProfileDescriptor(did),
                    VCLServiceTypes.fromIssuingType(
                        credentialManifestDescriptor.issuingType
                    )
                );

            let [err, verifiedProfile] = verifiedProfileResult.handleResult();
            if (verifiedProfile) {
                let credentialManifest =
                    await this.credentialManifestUseCase.getCredentialManifest(
                        credentialManifestDescriptor,
                        verifiedProfile
                    );
                let [error, credentialManifestResult] =
                    await credentialManifest.handleResult();
                if (error) {
                    logError("getCredentialManifest", error);
                    throw error;
                }
                return credentialManifestResult!;
            } else {
                throw err;
            }
        } catch (error: any) {
            logError("profile verification failed", error);
            throw error;
        }
    };
    generateOffers = async (
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        didJwk: Nullish<VCLDidJwk>
    ) => {
        const identificationSubmission = new VCLIdentificationSubmission(
            generateOffersDescriptor.credentialManifest,
            generateOffersDescriptor.identificationVerifiableCredentials
        );

        let identificationSubmissionResult =
            await this.identificationUseCase.submit(
                identificationSubmission,
                didJwk
            );

        let [error, submission] = identificationSubmissionResult.handleResult();
        if (error) {
            logError("submit identification", error);
            throw error;
        }

        console.log("Identification submitted success.");
        console.log(submission);

        return this.invokeGenerateOffersUseCase(
            generateOffersDescriptor,
            submission!.token
        );
    };

    checkForOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken
    ): Promise<VCLOffers> {
        return this.invokeGenerateOffersUseCase(
            generateOffersDescriptor,
            token
        );
    }
    finalizeOffers = async (
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        token: VCLToken,
        didJwk: Nullish<VCLDidJwk>
    ) => {
        let jwtVerifiableCredentials =
            await this.finalizeOffersUseCase.finalizeOffers(
                token,
                finalizeOffersDescriptor,
                didJwk
            );

        let [error, result] = jwtVerifiableCredentials.handleResult();
        if (error) {
            logError("finalizeOffers", error);
            throw error;
        }
        return result!;
    };

    async getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor
    ): Promise<VCLCredentialTypesUIFormSchema> {
        const countries = this.countriesModel?.data;
        if (countries) {
            let credentialTypesUIFormSchemaResult =
                await this.credentialTypesUIFormSchemaUseCase.getCredentialTypesUIFormSchema(
                    credentialTypesUIFormSchemaDescriptor,
                    countries
                );

            const [err, result] =
                credentialTypesUIFormSchemaResult.handleResult();
            if (err) {
                throw err;
            }

            return result!;
        } else {
            const error = new VCLError(
                "No countries for getCredentialTypesUIFormSchema"
            );
            logError("getCredentialTypesUIFormSchema", error);
            throw error;
        }
    }

    getVerifiedProfile = async (
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor
    ): Promise<VCLVerifiedProfile> => {
        let verifiedProfileResult =
            await this.verifiedProfileUseCase.getVerifiedProfile(
                verifiedProfileDescriptor
            );
        let [error, result] = await verifiedProfileResult.handleResult();
        if (error) {
            logError("getVerifiedProfile", error);
            throw error;
        }
        return result!;
    };

    verifyJwt = async (jwt: VCLJwt, jwkPublic: VCLPublicJwk) => {
        let isVerifiedResult = await this.jwtServiceUseCase.verifyJwt(
            jwt,
            jwkPublic
        );

        let [err, result] = isVerifiedResult.handleResult();
        if (err) {
            logError("verifyJwt", err);
            throw err;
        }
        return result!;
    };

    generateSignedJwt = async (jwtDescriptor: VCLJwtDescriptor) => {
        let jwtResult = await this.jwtServiceUseCase.generateSignedJwt(
            jwtDescriptor
        );

        let [err, result] = jwtResult.handleResult();
        if (err) {
            logError("generateSignedJwt", err);
            throw err;
        }
        return result!;
    };

    generateDidJwk = async () => {
        let didJwkResult = await this.jwtServiceUseCase.generateDidJwk(null);

        let [err, result] = didJwkResult.handleResult();
        if (err) {
            throw err;
        }
        return result!;
    };

    printVersion(): void {
        throw new Error("Method not implemented.");
    }

    private async invokeGenerateOffersUseCase(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken
    ): Promise<VCLOffers> {
        let vnOffersResult = await this.generateOffersUseCase.generateOffers(
            token,
            generateOffersDescriptor
        );

        let [err, result] = await vnOffersResult.handleResult();

        if (err) {
            throw err;
        }
        return result!;
    }
}

const logError = (message: String = "", error: VCLError) => {
    VCLLog.e(VCLImpl.TAG, `${message}: ${JSON.stringify(error)}`);
};
