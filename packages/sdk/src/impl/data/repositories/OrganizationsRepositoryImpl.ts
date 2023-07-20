import VCLError from "../../../api/entities/VCLError";
import VCLOrganization from "../../../api/entities/VCLOrganization";
import VCLOrganizations from "../../../api/entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "../../../api/entities/VCLOrganizationsSearchDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import OrganizationsRepository from "../../domain/repositories/OrganizationsRepository";
import Urls, { HeaderKeys, HeaderValues } from "./Urls";

export default class OrganizationsRepositoryImpl
    implements OrganizationsRepository
{
    constructor(private networkService: NetworkService) {}
    searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor,
        completionBlock: (r: VCLResult<VCLOrganizations>) => any
    ): void {
        const endpoint = organizationsSearchDescriptor.queryParams
            ? Urls.Organizations +
              "?" +
              organizationsSearchDescriptor.queryParams
            : Urls.Organizations;

        this.networkService.sendRequestRaw({
            useCaches: false,
            endpoint,
            headers: {
                [HeaderKeys.XVnfProtocolVersion]:
                    HeaderValues.XVnfProtocolVersion,
            },
            body: null,
            method: "GET",
            contentType: "application/json",
            completionBlock: (result) => {
                result.handleResult(
                    (organizationsResponse) => {
                        try {
                            completionBlock(
                                new VCLResult.Success(
                                    this.parse(organizationsResponse.payload)
                                )
                            );
                        } catch (error: any) {
                            completionBlock(
                                new VCLResult.Error(new VCLError(error))
                            );
                        }
                    },
                    (error) => {
                        completionBlock(new VCLResult.Error(error));
                    }
                );
            },
        });
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
