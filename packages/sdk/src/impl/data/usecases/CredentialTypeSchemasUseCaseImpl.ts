import VCLCredentialType from "../../../api/entities/VCLCredentialType";
import VCLCredentialTypeSchema from "../../../api/entities/VCLCredentialTypeSchema";
import VCLCredentialTypeSchemas from "../../../api/entities/VCLCredentialTypeSchemas";
import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import VCLResult from "../../../api/entities/VCLResult";
import CredentialTypeSchemaRepository from "../../domain/repositories/CredentialTypeSchemaRepository";
import CredentialTypeSchemasUseCase from "../../domain/usecases/CredentialTypeSchemasUseCase";
import VCLLog from "../../utils/VCLLog";

export default class CredentialTypeSchemasUseCaseImpl
    implements CredentialTypeSchemasUseCase
{
    private static readonly TAG = CredentialTypeSchemasUseCaseImpl.name;

    constructor(
        private readonly credentialTypeSchemaRepository: CredentialTypeSchemaRepository,
        private readonly credentialTypes: VCLCredentialTypes
    ) {}

    async getCredentialTypeSchemas(): Promise<
        VCLResult<VCLCredentialTypeSchemas>
    > {
        const credentialTypeSchemasMap: {
            [key: string]: VCLCredentialTypeSchema;
        } = {};
        let credentialTypeSchemasMapIsEmpty = true;

        const schemaNamesArr: string[] =
            this.credentialTypes.all
                ?.filter((it) => {
                    return it.schemaName != null;
                })
                .map<string>((it: VCLCredentialType) => {
                    return it.schemaName!;
                }) ?? [];

        for (const schemaName of schemaNamesArr) {
            const result =
                await this.credentialTypeSchemaRepository.getCredentialTypeSchema(
                    schemaName
                );
            if (result && result.getData()) {
                credentialTypeSchemasMap[schemaName] = result.getData()!;
                credentialTypeSchemasMapIsEmpty = false;
            }
        }

        return new VCLResult.Success(
            new VCLCredentialTypeSchemas(credentialTypeSchemasMap)
        );
    }
}
