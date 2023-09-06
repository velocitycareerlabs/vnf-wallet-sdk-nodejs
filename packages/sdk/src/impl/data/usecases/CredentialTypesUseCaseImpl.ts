import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import VCLResult from "../../../api/entities/VCLResult";
import CredentialTypesRepository from "../../domain/repositories/CredentialTypesRepository";
import { CredentialTypesUseCase } from "../../domain/usecases/CredentialTypesUseCase";

export default class CredentialTypesUseCaseImpl
    implements CredentialTypesUseCase
{
    constructor(private readonly credentialTypes: CredentialTypesRepository) {}
    async getCredentialTypes(): Promise<VCLResult<VCLCredentialTypes>> {
        let it = await this.credentialTypes.getCredentialTypes();
        return it;
    }
}
