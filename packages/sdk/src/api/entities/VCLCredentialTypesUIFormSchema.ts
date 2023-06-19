export default class VCLCredentialTypesUIFormSchema {
    constructor(public payload: JSONObject) {}
    // CodingKeys
    static readonly KeyAddressRegion = "addressRegion";
    static readonly KeyAddressCountry = "addressCountry";
    static readonly KeyUiEnum = "ui:enum";
    static readonly KeyUiNames = "ui:enumNames";
}
