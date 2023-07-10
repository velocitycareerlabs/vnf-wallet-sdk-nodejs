import VCLResult from "../../../api/entities/VCLResult";

export default interface Initializable<T> {
    initialize(
        cacheSequence: number,
        completionBlock: (r: VCLResult<T>) => any
    ): void;
}
