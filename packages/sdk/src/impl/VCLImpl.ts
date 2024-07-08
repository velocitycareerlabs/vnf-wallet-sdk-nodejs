import VCL from "../api/VCL";
import VCLCountries from "../api/entities/VCLCountries";
import VCLCredentialTypes from "../api/entities/VCLCredentialTypes";
import VCLCredentialTypeSchemas from "../api/entities/VCLCredentialTypeSchemas";
import VCLCredentialManifestDescriptor from "../api/entities/VCLCredentialManifestDescriptor";
import VCLCredentialTypesUIFormSchema from "../api/entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLDidJwk from "../api/entities/VCLDidJwk";
import VCLError from "../api/entities/error/VCLError";
import VCLExchangeDescriptor from "../api/entities/VCLExchangeDescriptor";
import VCLFinalizeOffersDescriptor from "../api/entities/VCLFinalizeOffersDescriptor";
import VCLGenerateOffersDescriptor from "../api/entities/VCLGenerateOffersDescriptor";
import VCLIdentificationSubmission from "../api/entities/VCLIdentificationSubmission";
import VCLInitializationDescriptor from "../api/entities/initialization/VCLInitializationDescriptor";
import VCLPublicJwk from "../api/entities/VCLPublicJwk";
import VCLJwt from "../api/entities/VCLJwt";
import VCLJwtDescriptor from "../api/entities/VCLJwtDescriptor";
import VCLOffers from "../api/entities/VCLOffers";
import {
    VCLOrganizationsSearchDescriptor
} from "../api/entities/VCLOrganizationsSearchDescriptor";
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
import VCLLog from "./utils/VCLLog";
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
import VCLDidJwkDescriptor from "../api/entities/VCLDidJwkDescriptor";
import KeyServiceUseCase from "./domain/usecases/KeyServiceUseCase";
import { Nullish } from "../api/VCLTypes";

export class VCLImpl implements VCL {
    static TAG = VCLImpl.name;

    static readonly ModelsToInitializeAmount = 3;

    credentialTypesModel: Nullish<CredentialTypesModel>;

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

    keyServiceUseCase!: KeyServiceUseCase;

    private initializationWatcher = new InitializationWatcher(
        VCLImpl.ModelsToInitializeAmount
    );

    // TODO: figure out a way to convert to promise
    async initialize(
        initializationDescriptor: VCLInitializationDescriptor
    ): Promise<Nullish<VCLError>> {

        this.initializationDescriptor = initializationDescriptor;
        this.initializationWatcher = new InitializationWatcher(
            VCLImpl.ModelsToInitializeAmount
        );

        this.initGlobalConfigurations();

        const completionHandler = (e?: any) => {
            if (e) return e;
            const firstError = this.initializationWatcher.firstError();
            if(!firstError) {
                this.initializeUseCases();
            }
            return firstError;
        };

        this.credentialTypesModel =
            VclBlocksProvider.provideCredentialTypesModel();

        this.countriesModel = VclBlocksProvider.provideCountriesModel();

        const initializeCountriesError = await this.countriesModel.initialize();
        this.initializationWatcher.onInitializedModel(initializeCountriesError);

        const initializeCredentialTypesError =
            await this.credentialTypesModel.initialize();

        if (
            initializeCredentialTypesError &&
            this.initializationWatcher.onInitializedModel(
                initializeCredentialTypesError,
                true
            )
        ) {
            return completionHandler();
        }

        if (this.initializationWatcher.onInitializedModel(null)) {
            return completionHandler();
        } else {
            if (this.credentialTypesModel?.data) {
                const credentialTypes = this.credentialTypesModel.data!;
                this.credentialTypeSchemasModel =
                    VclBlocksProvider.provideCredentialTypeSchemasModel(
                        credentialTypes
                    );
                // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
                const initializeCredentialTypeSchemasError =
                    await this.credentialTypeSchemasModel.initialize();

                if (
                    this.initializationWatcher.onInitializedModel(
                        initializeCredentialTypesError
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

    private initGlobalConfigurations() {
        GlobalConfig.CurrentEnvironment = this.initializationDescriptor.environment
        GlobalConfig.XVnfProtocolVersion = this.initializationDescriptor.xVnfProtocolVersion
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
            VclBlocksProvider.provideIdentificationSubmissionUseCase(
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

        this.keyServiceUseCase = VclBlocksProvider.provideKeyServiceUseCase(
            this.initializationDescriptor.cryptoServicesDescriptor
        );
    }

    get countries(): Nullish<VCLCountries> {
        return this.countriesModel?.data;
    }

    get credentialTypes(): Nullish<VCLCredentialTypes> {
        return this.credentialTypesModel?.data;
    }

    get credentialTypeSchemas(): Nullish<VCLCredentialTypeSchemas> {
        return this.credentialTypeSchemasModel?.data;
    }

    getPresentationRequest = async (
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ) => {
        const did = presentationRequestDescriptor.did;
        if (!did) {
            const err = new VCLError(
                `did was not found in ${JSON.stringify(
                    presentationRequestDescriptor
                )}`
            );
            logError("getPresentationRequest::verifiedProfile", err);
            throw err;
        }
        try {
            const verifiedProfile =
                await this.profileServiceTypeVerifier.verifyServiceTypeOfVerifiedProfile(
                    new VCLVerifiedProfileDescriptor(did),
                    new VCLServiceTypes([VCLServiceType.Inspector])
                );
            return await this.presentationRequestUseCase.getPresentationRequest(
                presentationRequestDescriptor,
                verifiedProfile
            );
        } catch (error: any) {
            logError("getPresentationRequest", error);
            throw VCLError.fromError(error);
        }
    };

    submitPresentation = async (
        presentationSubmission: VCLPresentationSubmission
    ) => {
        try {
            return await this.presentationSubmissionUseCase.submit(
                    presentationSubmission
                );
        } catch(error: any) {
            logError("submit presentation", error);
            throw VCLError.fromError(error);
        }
    };

    getExchangeProgress = async (exchangeDescriptor: VCLExchangeDescriptor) => {
        try {
            return await this.exchangeProgressUseCase.getExchangeProgress(
                exchangeDescriptor
            );
        } catch (error: any) {
            logError("getExchangeProgress", error);
            throw VCLError.fromError(error);
        }
    };

    searchForOrganizations = async (
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ) => {
        try {
            return await this.organizationsUseCase.searchForOrganizations(
                organizationsSearchDescriptor
            );
        } catch (error: any) {
            logError("getExchangeProgress", error);
            throw VCLError.fromError(error);
        }
    };

    getCredentialManifest = async (
        credentialManifestDescriptor: VCLCredentialManifestDescriptor
    ) => {
        const did = credentialManifestDescriptor.did;
        if (!did) {
            const error = new VCLError(
                `did was not found in ${JSON.stringify(
                    credentialManifestDescriptor
                )}`,
                VCLErrorCode.SdkError.toString(),
                null
            );
            logError('', error);
            throw VCLError.fromError(error);
        }
        let verifiedProfile: VCLVerifiedProfile;
        try {
            verifiedProfile =
                await this.profileServiceTypeVerifier.verifyServiceTypeOfVerifiedProfile(
                    new VCLVerifiedProfileDescriptor(did),
                    VCLServiceTypes.fromIssuingType(
                        credentialManifestDescriptor.issuingType
                    )
                );
        } catch (error: any) {
            logError(`failed to find verified profile by did ${did}`, error);
            throw VCLError.fromError(error);
        }
        try {
            return await this.credentialManifestUseCase.getCredentialManifest(
                credentialManifestDescriptor,
                verifiedProfile
            );
        } catch (error: any) {
            logError("getCredentialManifest", error);
            throw VCLError.fromError(error);
        }
    };

    generateOffers = async (
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
    ) => {
        const identificationSubmission = new VCLIdentificationSubmission(
            generateOffersDescriptor.credentialManifest,
            generateOffersDescriptor.identificationVerifiableCredentials
        );
        let identificationSubmissionResult: VCLSubmissionResult;
        try {
            identificationSubmissionResult =
                await this.identificationUseCase.submit(
                    identificationSubmission,
                );
        } catch (error: any) {
            logError("submit identification", error);
            throw VCLError.fromError(error);
        }

        VCLLog.i(VCLImpl.TAG, "Identification submitted success.");

        return this.invokeGenerateOffersUseCase(
            generateOffersDescriptor,
            identificationSubmissionResult.sessionToken
        );
    };

    checkForOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        sessionToken: VCLToken,
    ): Promise<VCLOffers> {
        return this.invokeGenerateOffersUseCase(
            generateOffersDescriptor,
            sessionToken
        );
    }

    finalizeOffers = async (
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        sessionToken: VCLToken,
    ) => {
        try {
            return await this.finalizeOffersUseCase.finalizeOffers(
                finalizeOffersDescriptor,
                sessionToken
            );
        } catch (error: any) {
            logError("finalizeOffers", error);
            throw VCLError.fromError(error);
        }
    };

    async getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor
    ): Promise<VCLCredentialTypesUIFormSchema> {
        const countries = this.countriesModel?.data;
        if (countries) {
            try {
                return await this.credentialTypesUIFormSchemaUseCase.getCredentialTypesUIFormSchema(
                    credentialTypesUIFormSchemaDescriptor,
                    countries
                );
            } catch (error: any) {
                logError("getCredentialTypesUIFormSchema", error);
                throw VCLError.fromError(error);
            }
        } else {
            const error = new VCLError(
                "No countries for getCredentialTypesUIFormSchema"
            );
            logError("getCredentialTypesUIFormSchema", error);
            throw VCLError.fromError(error);
        }
    }

    getVerifiedProfile = async (
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor
    ): Promise<VCLVerifiedProfile> => {
        try {
            return await this.verifiedProfileUseCase.getVerifiedProfile(
                    verifiedProfileDescriptor
                );
        } catch (error: any) {
            logError("getVerifiedProfile", error);
            throw VCLError.fromError(error);
        }
    };

    verifyJwt = async (
        jwt: VCLJwt,
        publicJwk: Nullish<VCLPublicJwk>,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ) => {
        try {
            return await this.jwtServiceUseCase.verifyJwt(
                jwt,
                publicJwk,
                remoteCryptoServicesToken
            );
        } catch (error: any) {
            logError("verifyJwt", error);
            throw VCLError.fromError(error);
        }
    };

    generateSignedJwt = async (
        jwtDescriptor: VCLJwtDescriptor,
        didJwk: VCLDidJwk,
        nonce: Nullish<string>,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ) => {
        try {
            return await this.jwtServiceUseCase.generateSignedJwt(
                jwtDescriptor,
                didJwk,
                nonce,
                remoteCryptoServicesToken
            );
        } catch (error: any) {
            logError("generateSignedJwt", error);
            throw VCLError.fromError(error);
        }
    };

    generateDidJwk = async (didJwkDescriptor: VCLDidJwkDescriptor) => {
        try {
            return await this.keyServiceUseCase.generateDidJwk(
                didJwkDescriptor
            );
        } catch (error: any) {
            logError("generateDidJwk", error);
            throw VCLError.fromError(error);
        }
    };

    printVersion(): void {
        VCLLog.e('', "Method not implemented.");
    }

    private async invokeGenerateOffersUseCase(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        sessionToken: VCLToken
    ): Promise<VCLOffers> {
        try {
            return await this.generateOffersUseCase.generateOffers(
                generateOffersDescriptor,
                sessionToken
            );
        } catch (error: any) {
            logError("generateOffers", error);
            throw VCLError.fromError(error);
        }
    }
}

const logError = (message = "", error: VCLError) => {
    VCLLog.e(VCLImpl.TAG, `${message}: ${error}`);
};
