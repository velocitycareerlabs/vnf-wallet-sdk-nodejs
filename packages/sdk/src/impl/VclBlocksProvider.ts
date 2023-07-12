import JwtServiceImpl from "./data/infrastructure/jwt/JwtServiceImpl";
import NetworkServiceImpl from "./data/infrastructure/network/NetworkServiceImpl";
import CredentialManifestRepositoryImpl from "./data/repositories/CredentialManifestRepositoryImpl";
import JwtServiceRepositoryImpl from "./data/repositories/JwtServiceRepositoryImpl";
import PresentationRequestRepositoryImpl from "./data/repositories/PresentationRequestRepositoryImpl";
import ResolveKidRepositoryImpl from "./data/repositories/ResolveKidRepositoryImpl";
import VerifiedProfileRepositoryImpl from "./data/repositories/VerifiedProfileRepositoryImpl";
import CredentialManifestUseCaseImpl from "./data/usecases/CredentialManifestUseCaseImpl";
import JwtServiceUseCaseImpl from "./data/usecases/JwtServiceUseCaseImpl";
import PresentationRequestUseCaseImpl from "./data/usecases/PresentationRequestUseCaseImpl";
import VerifiedProfileUseCaseImpl from "./data/usecases/VerifiedProfileUseCaseImpl";
import CredentialManifestUseCase from "./domain/usecases/CredentialManifestUseCase";
import JwtServiceUseCase from "./domain/usecases/JwtServiceUseCase";
import PresentationRequestUseCase from "./domain/usecases/PresentationRequestUseCase";
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
}
