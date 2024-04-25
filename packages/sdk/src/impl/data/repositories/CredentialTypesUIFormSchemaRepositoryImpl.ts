import VCLCountries from "../../../api/entities/VCLCountries";
import VCLCredentialTypesUIFormSchema from "../../../api/entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "../../../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLPlace from "../../../api/entities/VCLPlace";
import VCLRegions from "../../../api/entities/VCLRegions";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialTypesUIFormSchemaRepository from "../../domain/repositories/CredentialTypesUIFormSchemaRepository";
import Request, { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues, Params } from "./Urls";

export default class CredentialTypesUIFormSchemaRepositoryImpl
    implements CredentialTypesUIFormSchemaRepository
{
    constructor(private readonly networkService: NetworkService) {}

    async getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        countries: VCLCountries
    ): Promise<VCLResult<VCLCredentialTypesUIFormSchema>> {
        const result = await this.networkService.sendRequest({
            endpoint: Urls.CredentialTypesFormSchema.replace(
                Params.CredentialType,
                credentialTypesUIFormSchemaDescriptor.credentialType
            ),
            method: HttpMethod.GET,
            contentType: Request.ContentTypeApplicationJson,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            useCaches: true,
            body: null,
        });

        const [err, credentialTypesFormSchemaResponse] = result.handleResult();

        if (err) {
            return new VCLResult.Error(err);
        }
        const country = countries.countryByCode(
            credentialTypesUIFormSchemaDescriptor.countryCode
        );

        return new VCLResult.Success(
            new VCLCredentialTypesUIFormSchema(
                this.parseCredentialTypesUIFormSchema(
                    countries,
                    credentialTypesFormSchemaResponse?.payload,
                    country?.regions
                )
            )
        );
    }

    private parseCredentialTypesUIFormSchema(
        countries: VCLCountries,
        formSchemaDict: JSONObject,
        regions: Nullish<VCLRegions>
    ): JSONObject {
        let formSchemaDictCP = JSON.parse(JSON.stringify(formSchemaDict));
        for (const key of Object.keys(formSchemaDictCP)) {
            const valueDict = formSchemaDictCP[key];
            if (typeof valueDict === "object") {
                if (key === VCLCredentialTypesUIFormSchema.KeyAddressCountry) {
                    const allCountries = countries.all;
                    if (allCountries) {
                        formSchemaDictCP = this.updateAddressEnums(
                            allCountries,
                            key,
                            valueDict,
                            formSchemaDictCP
                        );
                    }
                } else if (
                    key == VCLCredentialTypesUIFormSchema.KeyAddressRegion
                ) {
                    const allRegions = regions?.all;
                    if (allRegions) {
                        formSchemaDictCP = this.updateAddressEnums(
                            allRegions,
                            key,
                            valueDict,
                            formSchemaDictCP
                        );
                    }
                } else {
                    formSchemaDictCP[key] =
                        this.parseCredentialTypesUIFormSchema(
                            countries,
                            valueDict,
                            regions
                        );
                }
            }
        }
        return formSchemaDictCP;
    }

    private updateAddressEnums(
        places: VCLPlace[],
        key: string,
        valueDict: JSONObject,
        formSchemaDict: JSONObject
    ): JSONObject {
        const formSchemaDictCP = JSON.parse(JSON.stringify(formSchemaDict));
        const valueDictHasKeyUiEnum = Object.keys(valueDict).includes(
            VCLCredentialTypesUIFormSchema.KeyUiEnum
        );
        const valueDictHasKeyUiNames = Object.keys(valueDict).includes(
            VCLCredentialTypesUIFormSchema.KeyUiNames
        );

        if (valueDictHasKeyUiEnum || valueDictHasKeyUiNames) {
            const uiEnumArr: JSONObject[] = [];
            const uiNamesArr: JSONObject[] = [];
            places.forEach((place) => {
                if (valueDictHasKeyUiEnum) {
                    uiEnumArr.push(place.code);
                }
                if (valueDictHasKeyUiNames) {
                    uiNamesArr.push(place.name);
                }
            });
            if (valueDictHasKeyUiEnum) {
                valueDict[VCLCredentialTypesUIFormSchema.KeyUiEnum] = uiEnumArr;
            }
            if (valueDictHasKeyUiNames) {
                valueDict[VCLCredentialTypesUIFormSchema.KeyUiNames] =
                    uiNamesArr;
            }
            formSchemaDictCP[key] = valueDict;
        }
        return formSchemaDictCP;
    }
}
