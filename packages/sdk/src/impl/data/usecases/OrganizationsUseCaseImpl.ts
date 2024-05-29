import VCLOrganizations from "../../../api/entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "../../../api/entities/VCLOrganizationsSearchDescriptor";
import OrganizationsRepository from "../../domain/repositories/OrganizationsRepository";
import OrganizationsUseCase from "../../domain/usecases/OrganizationsUseCase";

export default class OrganizationsUseCaseImpl implements OrganizationsUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ): Promise<VCLOrganizations> {
        try {
            return await this.organizationsRepository.searchForOrganizations(organizationsSearchDescriptor);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
