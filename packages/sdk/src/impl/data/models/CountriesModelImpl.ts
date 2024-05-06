import VCLCountries from "../../../api/entities/VCLCountries";
import VCLError from "../../../api/entities/error/VCLError";
import VCLResult from "../../../api/entities/VCLResult";
import CountriesModel from "../../domain/models/CountriesModel";
import CountriesUseCase from "../../domain/usecases/CountriesModelUseCase";
import { Nullish } from "../../../types";

export default class CountriesModelImpl implements CountriesModel {
    constructor(private readonly countriesUseCase: CountriesUseCase) {}

    data: Nullish<VCLCountries>;
    async initialize(): Promise<VCLError | null> {
        const result = await this.countriesUseCase.getCountries();

        const [err, d] = result.handleResult();
        if (err) {
            return new VCLError(err.message);
        }

        this.data = result.getData();
        return null;
    }
}
