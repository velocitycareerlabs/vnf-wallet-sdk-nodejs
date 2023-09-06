import VCLCredentialTypes from "../api/entities/VCLCredentialTypes";
import JwtServiceImpl from "./data/infrastructure/jwt/JwtServiceImpl";
import NetworkServiceImpl from "./data/infrastructure/network/NetworkServiceImpl";
import CountriesModelImpl from "./data/models/CountriesModelImpl";
import CredentialTypeSchemasModelImpl from "./data/models/CredentialTypeSchemasModelImpl";
import CredentialTypesModelImpl from "./data/models/CredentialTypesModelImpl";
import CountriesRepositoryImpl from "./data/repositories/CountriesRepositoryImpl";
import CredentialManifestRepositoryImpl from "./data/repositories/CredentialManifestRepositoryImpl";
import CredentialTypeSchemaRepositoryImpl from "./data/repositories/CredentialTypeSchemaRepositoryImpl";
import CredentialTypesRepositoryImpl from "./data/repositories/CredentialTypesRepositoryImpl";
import ExchangeProgressRepositoryImpl from "./data/repositories/ExchangeProgressRepositoryImpl";
import { FinalizeOffersRepositoryImpl } from "./data/repositories/FinalizeOffersRepositoryImpl";
import GenerateOffersRepositoryImpl from "./data/repositories/GenerateOffersRepositoryImpl";
import IdentificationSubmissionRepositoryImpl from "./data/repositories/IdentificationSubmissionRepositoryImpl";
import JwtServiceRepositoryImpl from "./data/repositories/JwtServiceRepositoryImpl";
import OrganizationsRepositoryImpl from "./data/repositories/OrganizationsRepositoryImpl";
import PresentationRequestRepositoryImpl from "./data/repositories/PresentationRequestRepositoryImpl";
import ResolveKidRepositoryImpl from "./data/repositories/ResolveKidRepositoryImpl";
import VerifiedProfileRepositoryImpl from "./data/repositories/VerifiedProfileRepositoryImpl";
import CountriesUseCaseImpl from "./data/usecases/CountriesModelUseCaseImpl";
import CredentialManifestUseCaseImpl from "./data/usecases/CredentialManifestUseCaseImpl";
import CredentialTypeSchemasUseCaseImpl from "./data/usecases/CredentialTypeSchemasUseCaseImpl";
import CredentialTypesUseCaseImpl from "./data/usecases/CredentialTypesUseCaseImpl";
import ExchangeProgressUseCaseImpl from "./data/usecases/ExchangeProgressUseCaseImpl";
import FinalizeOffersUseCaseImpl from "./data/usecases/FinalizeOffersUseCaseImpl";
import GenerateOffersUseCaseImpl from "./data/usecases/GenerateOffersUseCaseImpl";
import IdentificationSubmissionUseCaseImpl from "./data/usecases/IdentificationSubmissionUseCaseImpl";
import JwtServiceUseCaseImpl from "./data/usecases/JwtServiceUseCaseImpl";
import OrganizationsUseCaseImpl from "./data/usecases/OrganizationsUseCaseImpl";
import PresentationRequestUseCaseImpl from "./data/usecases/PresentationRequestUseCaseImpl";
import PresentationSubmissionUseCaseImpl from "./data/usecases/PresentationSubmissionUseCaseImpl";
import VerifiedProfileUseCaseImpl from "./data/usecases/VerifiedProfileUseCaseImpl";
import CountriesModel from "./domain/models/CountriesModel";
import CredentialTypeSchemasModel from "./domain/models/CredentialTypeSchemasModel";
import CredentialTypesModel from "./domain/models/CredentialTypesModel";
import CredentialManifestUseCase from "./domain/usecases/CredentialManifestUseCase";
import ExchangeProgressUseCase from "./domain/usecases/ExchangeProgressUseCase";
import FinalizeOffersUseCase from "./domain/usecases/FinalizeOffersUseCase";
import GenerateOffersUseCase from "./domain/usecases/GenerateOffersUseCase";
import IdentificationSubmissionUseCase from "./domain/usecases/IdentificationSubmissionUseCase";
import JwtServiceUseCase from "./domain/usecases/JwtServiceUseCase";
import OrganizationsUseCase from "./domain/usecases/OrganizationsUseCase";
import PresentationRequestUseCase from "./domain/usecases/PresentationRequestUseCase";
import PresentationSubmissionUseCase from "./domain/usecases/PresentationSubmissionUseCase";
import VerifiedProfileUseCase from "./domain/usecases/VerifiedProfileUseCase";

export default class VclBlocksProvider {
    static providePresentationRequestUseCase(): PresentationRequestUseCase {
        return new PresentationRequestUseCaseImpl(
            new PresentationRequestRepositoryImpl(new NetworkServiceImpl()),
            new ResolveKidRepositoryImpl(new NetworkServiceImpl()),
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );
    }

    static provideVerifiedProfileUseCase(): VerifiedProfileUseCase {
        return new VerifiedProfileUseCaseImpl(
            new VerifiedProfileRepositoryImpl(new NetworkServiceImpl())
        );
    }

    static provideJwtServiceUseCase(): JwtServiceUseCase {
        return new JwtServiceUseCaseImpl(
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );
    }

    static provideCredentialManifestUseCase(): CredentialManifestUseCase {
        return new CredentialManifestUseCaseImpl(
            new CredentialManifestRepositoryImpl(new NetworkServiceImpl()),
            new ResolveKidRepositoryImpl(new NetworkServiceImpl()),
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );
    }

    static provideIdentificationUseCase(): IdentificationSubmissionUseCase {
        return new IdentificationSubmissionUseCaseImpl(
            new IdentificationSubmissionRepositoryImpl(
                new NetworkServiceImpl()
            ),
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );
    }

    static provideGenerateOffersUseCase(): GenerateOffersUseCase {
        return new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(new NetworkServiceImpl())
        );
    }

    static provideFinalizeOffersUseCase(): FinalizeOffersUseCase {
        return new FinalizeOffersUseCaseImpl(
            new FinalizeOffersRepositoryImpl(new NetworkServiceImpl()),
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );
    }

    static providePresentationSubmissionUseCase(): PresentationSubmissionUseCase {
        return new PresentationSubmissionUseCaseImpl(
            new IdentificationSubmissionRepositoryImpl(
                new NetworkServiceImpl()
            ),
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );
    }

    static provideExchangeProgressUseCase(): ExchangeProgressUseCase {
        return new ExchangeProgressUseCaseImpl(
            new ExchangeProgressRepositoryImpl(new NetworkServiceImpl())
        );
    }

    static provideOrganizationsUseCase(): OrganizationsUseCase {
        return new OrganizationsUseCaseImpl(
            new OrganizationsRepositoryImpl(new NetworkServiceImpl())
        );
    }

    static provideCredentialTypesModel(): CredentialTypesModel {
        return new CredentialTypesModelImpl(
            new CredentialTypesUseCaseImpl(
                new CredentialTypesRepositoryImpl(new NetworkServiceImpl())
            )
        );
    }

    static provideCountryCodesModel(): CountriesModel {
        return new CountriesModelImpl(
            new CountriesUseCaseImpl(
                new CountriesRepositoryImpl(new NetworkServiceImpl())
            )
        );
    }

    static provideCredentialTypeSchemasModel(
        credentialTypes: VCLCredentialTypes
    ): CredentialTypeSchemasModel {
        return new CredentialTypeSchemasModelImpl(
            new CredentialTypeSchemasUseCaseImpl(
                new CredentialTypeSchemaRepositoryImpl(
                    new NetworkServiceImpl()
                ),
                credentialTypes
            )
        );
    }
}
