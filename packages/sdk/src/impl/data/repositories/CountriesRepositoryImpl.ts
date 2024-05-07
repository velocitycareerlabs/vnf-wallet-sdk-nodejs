import { Dictionary, Nullish } from "../../../api/VCLTypes";
import VCLCountries from "../../../api/entities/VCLCountries";
import VCLCountry from "../../../api/entities/VCLCountry";
import VCLRegion from "../../../api/entities/VCLRegion";
import VCLRegions from "../../../api/entities/VCLRegions";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CountriesRepository from "../../domain/repositories/CountriesRepository";
import Request, { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class CountriesRepositoryImpl implements CountriesRepository {
    constructor(private readonly networkService: NetworkService) {}

    getCountries(): Promise<VCLResult<VCLCountries>> {
        return this.fetchCountries(Urls.Countries);
    }

    private async fetchCountries(
        endpoint: string
    ): Promise<VCLResult<VCLCountries>> {
        const result = await this.networkService.sendRequest({
            endpoint,
            contentType: Request.ContentTypeApplicationJson,
            method: HttpMethod.GET,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            useCaches: true,
            body: null,
        });

        const [error, countriesResponse] = await result.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }

        return new VCLResult.Success(
            new VCLCountries(
                (countriesResponse!.payload as Dictionary<any>[]).map((i) =>
                    this.parseCountry(i)
                )
            )
        );
    }

    private parseCountry(countryJsonObj: Dictionary<any>): VCLCountry {
        const jsonArrRegions = countryJsonObj[VCLCountry.KeyRegions];
        let regions: Nullish<VCLRegions> = null;

        if (jsonArrRegions) {
            const regionList: VCLRegion[] = jsonArrRegions.map(
                (item: Dictionary<any>) => {
                    return new VCLRegion(
                        item,
                        item[VCLRegion.KeyCode],
                        item[VCLRegion.KeyName]
                    );
                }
            );
            regions = new VCLRegions(regionList);
        }

        return new VCLCountry(
            countryJsonObj,
            countryJsonObj[VCLCountry.KeyCode],
            countryJsonObj[VCLCountry.KeyName],
            regions
        );
    }
}
