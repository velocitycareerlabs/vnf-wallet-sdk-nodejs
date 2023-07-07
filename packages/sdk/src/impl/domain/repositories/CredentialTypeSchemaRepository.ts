import VCLCredentialTypeSchema from "../../../api/entities/VCLCredentialTypeSchema";
import VCLResult from "../../../api/entities/VCLResult";

export default interface CredentialTypeSchemaRepository {
    getCredentialTypeSchema(
        schemaName: string,
        cacheSequence: number,
        completionBlock: (r: VCLResult<VCLCredentialTypeSchema>) => any
    ): void;
}
