export default class VCLCredentialType {
    constructor(
        public payload: JSONObject,
        public id: Nullish<string>,
        public schema: Nullish<string>,
        public createdAt: Nullish<string>,
        public schemaName: Nullish<string>,
        public credentialType: Nullish<string>,
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
