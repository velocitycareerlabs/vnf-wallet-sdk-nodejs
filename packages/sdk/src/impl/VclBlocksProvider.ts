import JwtServiceImpl from "./data/infrastructure/jwt/JwtServiceImpl";
import NetworkServiceImpl from "./data/infrastructure/network/NetworkServiceImpl";
import CredentialManifestRepositoryImpl from "./data/repositories/CredentialManifestRepositoryImpl";
import { FinalizeOffersRepositoryImpl } from "./data/repositories/FinalizeOffersRepositoryImpl";
import GenerateOffersRepositoryImpl from "./data/repositories/GenerateOffersRepositoryImpl";
import IdentificationSubmissionRepositoryImpl from "./data/repositories/IdentificationSubmissionRepositoryImpl";
import JwtServiceRepositoryImpl from "./data/repositories/JwtServiceRepositoryImpl";
import PresentationRequestRepositoryImpl from "./data/repositories/PresentationRequestRepositoryImpl";
import ResolveKidRepositoryImpl from "./data/repositories/ResolveKidRepositoryImpl";
import VerifiedProfileRepositoryImpl from "./data/repositories/VerifiedProfileRepositoryImpl";
import CredentialManifestUseCaseImpl from "./data/usecases/CredentialManifestUseCaseImpl";
import FinalizeOffersUseCaseImpl from "./data/usecases/FinalizeOffersUseCaseImpl";
import GenerateOffersUseCaseImpl from "./data/usecases/GenerateOffersUseCaseImpl";
import IdentificationSubmissionUseCaseImpl from "./data/usecases/IdentificationSubmissionUseCaseImpl";
import JwtServiceUseCaseImpl from "./data/usecases/JwtServiceUseCaseImpl";
import PresentationRequestUseCaseImpl from "./data/usecases/PresentationRequestUseCaseImpl";
import PresentationSubmissionUseCaseImpl from "./data/usecases/PresentationSubmissionUseCaseImpl";
import VerifiedProfileUseCaseImpl from "./data/usecases/VerifiedProfileUseCaseImpl";
import CredentialManifestUseCase from "./domain/usecases/CredentialManifestUseCase";
import FinalizeOffersUseCase from "./domain/usecases/FinalizeOffersUseCase";
import GenerateOffersUseCase from "./domain/usecases/GenerateOffersUseCase";
import IdentificationSubmissionUseCase from "./domain/usecases/IdentificationSubmissionUseCase";
import JwtServiceUseCase from "./domain/usecases/JwtServiceUseCase";
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
}
