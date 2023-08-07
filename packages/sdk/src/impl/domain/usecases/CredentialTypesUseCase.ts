import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import VCLResult from "../../../api/entities/VCLResult";

export interface CredentialTypesUseCase {
    getCredentialTypes(): Promise<VCLResult<VCLCredentialTypes>>;
}
