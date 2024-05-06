import { Nullish } from "../../..//types";
import VCLError from "../../../api/entities/error/VCLError";
import VCLOrganization from "../../../api/entities/VCLOrganization";
import VCLOrganizations from "../../../api/entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "../../../api/entities/VCLOrganizationsSearchDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import OrganizationsRepository from "../../domain/repositories/OrganizationsRepository";
import { HttpMethod } from "../infrastructure/network/Request";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class OrganizationsRepositoryImpl
    implements OrganizationsRepository
{
    constructor(private networkService: NetworkService) {}
    async searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ): Promise<VCLResult<VCLOrganizations>> {
        const endpoint = organizationsSearchDescriptor.queryParams
            ? Urls.Organizations +
              "?" +
              organizationsSearchDescriptor.queryParams
            : Urls.Organizations;

        const result = await this.networkService.sendRequest({
            useCaches: false,
            endpoint,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            method: HttpMethod.GET,
            contentType: null,
        });

        const [error, organizationsResponse] = await result.handleResult();
        if (error) {
            return new VCLResult.Error(error);
        }
        try {
            return new VCLResult.Success(
                this.parse(organizationsResponse!.payload)
            );
        } catch (error: any) {
            return new VCLResult.Error(new VCLError(error));
        }
    }

    private parse(organizationsRaw: JSONObject): VCLOrganizations {
        const organizationsJsonArray: Nullish<JSONObject[]> =
            organizationsRaw[VCLOrganizations.KeyResult];

        const organizations: VCLOrganization[] = (
            organizationsJsonArray ?? []
        ).map((o) => new VCLOrganization(o));

        return new VCLOrganizations(organizations);
    }
}
