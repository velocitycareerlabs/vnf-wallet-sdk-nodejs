// package io.velocitycareerlabs.impl.domain.repositories

import VCLOrganizations from "../../../api/entities/VCLOrganizations";
import VCLOrganizationsSearchDescriptor from "../../../api/entities/VCLOrganizationsSearchDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface OrganizationsRepository {
    searchForOrganizations(
        organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor
    ): Promise<VCLResult<VCLOrganizations>>;
}
