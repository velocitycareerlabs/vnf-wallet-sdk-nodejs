import VCLCountries from "./entities/VCLCountries";
import VCLCredentialManifest from "./entities/VCLCredentialManifest";
import VCLCredentialManifestDescriptor from "./entities/VCLCredentialManifestDescriptor";
import VCLCredentialTypeSchemas from "./entities/VCLCredentialTypeSchemas";
import VCLCredentialTypes from "./entities/VCLCredentialTypes";
import VCLCredentialTypesUIFormSchema from "./entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "./entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLDidJwk from "./entities/VCLDidJwk";
import VCLError from "./entities/VCLError";
import VCLExchange from "./entities/VCLExchange";
import VCLExchangeDescriptor from "./entities/VCLExchangeDescriptor";
import VCLFinalizeOffersDescriptor from "./entities/VCLFinalizeOffersDescriptor";
import VCLGenerateOffersDescriptor from "./entities/VCLGenerateOffersDescriptor";
import VCLInitializationDescriptor from "./entities/VCLInitializationDescriptor";
import VCLJwkPublic from "./entities/VCLJwkPublic";
import VCLJwt from "./entities/VCLJwt";
import VCLJwtDescriptor from "./entities/VCLJwtDescriptor";
import VCLJwtVerifiableCredentials from "./entities/VCLJwtVerifiableCredentials";
import VCLOffers from "./entities/VCLOffers";
import VCLOrganizations from "./entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "./entities/VCLOrganizationsSearchDescriptor";
import VCLPresentationRequest from "./entities/VCLPresentationRequest";
import VCLPresentationRequestDescriptor from "./entities/VCLPresentationRequestDescriptor";
import VCLPresentationSubmission from "./entities/VCLPresentationSubmission";
import VCLSubmissionResult from "./entities/VCLSubmissionResult";
import VCLToken from "./entities/VCLToken";
import VCLVerifiedProfile from "./entities/VCLVerifiedProfile";
import VCLVerifiedProfileDescriptor from "./entities/VCLVerifiedProfileDescriptor";

export default interface VCL {
    initialize(
        initializationDescriptor: VCLInitializationDescriptor,
        successHandler: () => any,
        errorHandler: (e: VCLError) => any
    ): void;

    countries: Nullish<VCLCountries>;
    credentialTypes: Nullish<VCLCredentialTypes>;
    credentialTypeSchemas: Nullish<VCLCredentialTypeSchemas>;

    getPresentationRequest(
        presentationRequestDescriptor: VCLPresentationRequestDescriptor
    ): Promise<VCLPresentationRequest>;

    submitPresentation(
        presentationSubmission: VCLPresentationSubmission
    ): Promise<VCLSubmissionResult>;

    getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor
    ): Promise<VCLExchange>;

    searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ): Promise<VCLOrganizations>;

    getCredentialManifest(
        credentialManifestDescriptor: VCLCredentialManifestDescriptor
    ): Promise<VCLCredentialManifest>;

    generateOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void;

    checkForOffers(
        generateOffersDescriptor: VCLGenerateOffersDescriptor,
        token: VCLToken,
        successHandler: (o: VCLOffers) => any,
        errorHandler: (e: VCLError) => any
    ): void;

    finalizeOffers(
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
        token: VCLToken
    ): Promise<VCLJwtVerifiableCredentials>;

    getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        successHandler: (s: VCLCredentialTypesUIFormSchema) => any,
        errorHandler: (e: VCLError) => any
    ): void;

    getVerifiedProfile(
        verifiedProfileDescriptor: VCLVerifiedProfileDescriptor
    ): Promise<VCLVerifiedProfile>;

    verifyJwt(jwt: VCLJwt, jwkPublic: VCLJwkPublic): Promise<boolean>;

    generateSignedJwt(jwtDescriptor: VCLJwtDescriptor): Promise<VCLJwt>;

    generateDidJwk(): Promise<VCLDidJwk>;

    printVersion(): void;
}
