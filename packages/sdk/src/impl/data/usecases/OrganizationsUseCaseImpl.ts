import VCLOrganizations from "../../../api/entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "../../../api/entities/VCLOrganizationsSearchDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import OrganizationsRepository from "../../domain/repositories/OrganizationsRepository";
import OrganizationsUseCase from "../../domain/usecases/OrganizationsUseCase";

export default class OrganizationsUseCaseImpl implements OrganizationsUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ): Promise<VCLResult<VCLOrganizations>> {
        return this.organizationsRepository.searchForOrganizations(
            organizationsSearchDescriptor
        );
    }
}
