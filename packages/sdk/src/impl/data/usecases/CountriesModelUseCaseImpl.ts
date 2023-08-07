import VCLCountries from "../../../api/entities/VCLCountries";
import VCLResult from "../../../api/entities/VCLResult";
import CountriesRepository from "../../domain/repositories/CountriesRepository";
import CountriesUseCase from "../../domain/usecases/CountriesModelUseCase";

export default class CountriesUseCaseImpl implements CountriesUseCase {
    constructor(private readonly countriesRepository: CountriesRepository) {}

    getCountries(): Promise<VCLResult<VCLCountries>> {
        return this.countriesRepository.getCountries();
    }
}
