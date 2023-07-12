import VCLCredentialTypesUIFormSchemaDescriptor from "../../../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLCountries from "../../../api/entities/VCLCountries";
import VCLResult from "../../../api/entities/VCLResult";
import VCLCredentialTypesUIFormSchema from "../../../api/entities/VCLCredentialTypesUIFormSchema";

export default interface CredentialTypesUIFormSchemaUseCase {
    getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        countries: VCLCountries,
        completionBlock: (r: VCLResult<VCLCredentialTypesUIFormSchema>) => any
    ): void;
}
