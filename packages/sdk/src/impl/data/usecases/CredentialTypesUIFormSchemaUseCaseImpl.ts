import VCLCountries from "../../../api/entities/VCLCountries";
import VCLCredentialTypesUIFormSchema from "../../../api/entities/VCLCredentialTypesUIFormSchema";
import VCLCredentialTypesUIFormSchemaDescriptor from "../../../api/entities/VCLCredentialTypesUIFormSchemaDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import CredentialTypesUIFormSchemaRepository from "../../domain/repositories/CredentialTypesUIFormSchemaRepository";
import CredentialTypesUIFormSchemaUseCase from "../../domain/usecases/CredentialTypesUIFormSchemaUseCase";

export default class CredentialTypesUIFormSchemaUseCaseImpl
    implements CredentialTypesUIFormSchemaUseCase
{
    constructor(
        private readonly credentialTypesUIFormSchemaRepository: CredentialTypesUIFormSchemaRepository
    ) {}

    getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
        countries: VCLCountries
    ): Promise<VCLResult<VCLCredentialTypesUIFormSchema>> {
        return this.credentialTypesUIFormSchemaRepository.getCredentialTypesUIFormSchema(
            credentialTypesUIFormSchemaDescriptor,
            countries
        );
    }
}
