import VCLCredentialTypeSchemas from "../../../api/entities/VCLCredentialTypeSchemas";
import VCLError from "../../../api/entities/error/VCLError";
import VCLResult from "../../../api/entities/VCLResult";
import CredentialTypeSchemasModel from "../../domain/models/CredentialTypeSchemasModel";
import CredentialTypeSchemasUseCase from "../../domain/usecases/CredentialTypeSchemasUseCase";

export default class CredentialTypeSchemasModelImpl
    implements CredentialTypeSchemasModel
{
    constructor(
        private readonly credentialTypeSchemasUseCase: CredentialTypeSchemasUseCase
    ) {}
    data: Nullish<VCLCredentialTypeSchemas>;

    async initialize(): Promise<VCLError | null> {
        const result =
            await this.credentialTypeSchemasUseCase.getCredentialTypeSchemas();
        const [err, d] = result.handleResult();

        if (err) {
            return new VCLError(err.message);
        }

        this.data = result.getData();
        return null;
    }
}
