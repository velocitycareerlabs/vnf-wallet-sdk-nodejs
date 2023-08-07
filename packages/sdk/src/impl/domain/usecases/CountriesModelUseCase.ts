import VCLCountries from "../../../api/entities/VCLCountries";
import VCLResult from "../../../api/entities/VCLResult";

export default interface CountriesUseCase {
    getCountries(): Promise<VCLResult<VCLCountries>>;
}
