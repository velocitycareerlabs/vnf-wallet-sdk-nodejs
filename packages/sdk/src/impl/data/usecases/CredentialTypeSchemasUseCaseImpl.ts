import VCLCredentialType from "../../../api/entities/VCLCredentialType";
import VCLCredentialTypeSchema from "../../../api/entities/VCLCredentialTypeSchema";
import VCLCredentialTypeSchemas from "../../../api/entities/VCLCredentialTypeSchemas";
import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import CredentialTypeSchemaRepository from "../../domain/repositories/CredentialTypeSchemaRepository";
import CredentialTypeSchemasUseCase from "../../domain/usecases/CredentialTypeSchemasUseCase";

export default class CredentialTypeSchemasUseCaseImpl
    implements CredentialTypeSchemasUseCase
{
    private static readonly TAG = CredentialTypeSchemasUseCaseImpl.name;

    constructor(
        private readonly credentialTypeSchemaRepository: CredentialTypeSchemaRepository,
        private readonly credentialTypes: VCLCredentialTypes
    ) {}

    async getCredentialTypeSchemas(): Promise<VCLCredentialTypeSchemas> {
        const credentialTypeSchemasMap: {
            [key: string]: VCLCredentialTypeSchema;
        } = {};

        const schemaNamesArr: string[] =
            this.credentialTypes.all
                ?.filter((it) => {
                    return it.schemaName != null;
                })
                .map<string>((it: VCLCredentialType) => {
                    return it.schemaName!;
                }) ?? [];

        for (const schemaName of schemaNamesArr) {
            credentialTypeSchemasMap[schemaName] =
                await this.credentialTypeSchemaRepository.getCredentialTypeSchema(schemaName);
        }
        return new VCLCredentialTypeSchemas(credentialTypeSchemasMap);
    }
}
