import VCLCredentialTypeSchema from "../../../api/entities/VCLCredentialTypeSchema";
import VCLResult from "../../../api/entities/VCLResult";

export default interface CredentialTypeSchemaRepository {
    getCredentialTypeSchema(
        schemaName: string
    ): Promise<VCLResult<VCLCredentialTypeSchema>>;
}
