// package io.velocitycareerlabs.impl.domain.repositories

import VCLCountries from "../../../api/entities/VCLCountries";
import VCLCredentialTypesUIFormSchema from "../../../api/entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "../../../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface CredentialTypesUIFormSchemaRepository {
    getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        countries: VCLCountries,
        completionBlock: (r: VCLResult<VCLCredentialTypesUIFormSchema>) => any
    ): void;
}
