import VerifiedProfileUseCase from "./domain/usecases/VerifiedProfileUseCase";

export class VclBlocksProvider {
    /*
    fun provideVerifiedProfileUseCase(): VerifiedProfileUseCase =
                VerifiedProfileUseCaseImpl(
                        VerifiedProfileRepositoryImpl(
                                NetworkServiceImpl()
                        ),
                        ExecutorImpl()
                )
*/
    static provideVerifiedProfileUseCase(): VerifiedProfileUseCase {
        return new VerifiedProfileUseCaseImpl();
    }
}
