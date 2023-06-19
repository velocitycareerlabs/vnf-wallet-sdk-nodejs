import VCLCredentialType from "./VCLCredentialType";

export default class VCLCredentialTypes {
    constructor(public all: Nullish<VCLCredentialType[]>) {}

    get recommendedTypes(): Nullish<VCLCredentialType[]> {
        return this.all?.filter((item) => item.recommended);
    }
}
