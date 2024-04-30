export default class VCLCredentialType {
    constructor(
        public payload: JSONObject,
        public id: string | null | undefined,
        public schema: string | null | undefined,
        public createdAt: string | null | undefined,
        public schemaName: string | null | undefined,
        public credentialType: string | null | undefined,
        public recommended: boolean
    ) {}

    // CodingKeys
    static readonly KeyId = "id";
    static readonly KeySchema = "schema";
    static readonly KeyCreatedAt = "createdAt";
    static readonly KeySchemaName = "schemaName";
    static readonly KeyCredentialType = "credentialType";
    static readonly KeyRecommended = "recommended";
}
