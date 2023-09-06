import VCLResult from "../../../api/entities/VCLResult";
import VCLCountries from "../../../api/entities/VCLCountries";

export default interface CountriesRepository {
    getCountries(): Promise<VCLResult<VCLCountries>>;
}
