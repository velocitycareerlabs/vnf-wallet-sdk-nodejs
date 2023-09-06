import VCLCountries from "../../../api/entities/VCLCountries";
import VCLError from "../../../api/entities/VCLError";
import VCLResult from "../../../api/entities/VCLResult";
import CountriesModel from "../../domain/models/CountriesModel";
import CountriesUseCase from "../../domain/usecases/CountriesModelUseCase";

export default class CountriesModelImpl implements CountriesModel {
    constructor(private readonly countriesUseCase: CountriesUseCase) {}

    data: Nullish<VCLCountries>;
    async initialize(): Promise<VCLError | null> {
        let result = await this.countriesUseCase.getCountries();

        let [err, d] = result.handleResult();
        if (err) {
            return new VCLError(err.message);
        }

        this.data = result.getData();
        return null;
    }
}
