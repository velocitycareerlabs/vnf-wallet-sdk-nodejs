import VCLOrganizations from "../../../api/entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "../../../api/entities/VCLOrganizationsSearchDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface OrganizationsUseCase {
    searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ): Promise<VCLResult<VCLOrganizations>>;
}
