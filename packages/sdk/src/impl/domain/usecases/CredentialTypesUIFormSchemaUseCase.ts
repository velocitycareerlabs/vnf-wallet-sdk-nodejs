/*internal interface CredentialTypesUIFormSchemaUseCase {
    fun getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        countries: VCLCountries,
        completionBlock: (VCLResult<VCLCredentialTypesUIFormSchema>) -> Unit
    )
}*/

import VCLCountries from "../../../api/entities/VCLCountries";
import VCLCredentialTypesUIFormSchema from "../../../api/entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "../../../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface CredentialTypesUIFormSchemaUseCase {
    getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        countries: VCLCountries
    ): Promise<VCLResult<VCLCredentialTypesUIFormSchema>>;
}
