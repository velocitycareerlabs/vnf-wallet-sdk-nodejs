import JwtServiceImpl from "./data/infrastructure/jwt/JwtServiceImpl";
import NetworkServiceImpl from "./data/infrastructure/network/NetworkServiceImpl";
import JwtServiceRepositoryImpl from "./data/repositories/JwtServiceRepositoryImpl";
import VerifiedProfileRepositoryImpl from "./data/repositories/VerifiedProfileRepositoryImpl";
import JwtServiceUseCaseImpl from "./data/usecases/JwtServiceUseCaseImpl";
import VerifiedProfileUseCaseImpl from "./data/usecases/VerifiedProfileUseCaseImpl";
import JwtServiceUseCase from "./domain/usecases/JwtServiceUseCase";
import VerifiedProfileUseCase from "./domain/usecases/VerifiedProfileUseCase";

export default class VclBlocksProvider {
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
}
