import VCLResult from "../../../api/entities/VCLResult";
import VCLCountries from "../../../api/entities/VCLCountries";

export default interface CountriesRepository {
    getCountries(
        cacheSequence: number,
        completionBlock: (r: VCLResult<VCLCountries>) => any
    ): void;
}
