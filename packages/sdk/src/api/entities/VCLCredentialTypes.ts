import VCLCredentialType from "./VCLCredentialType";

export default class VCLCredentialTypes {
    constructor(public all: VCLCredentialType[] | null | undefined) {}

    get recommendedTypes(): VCLCredentialType[] | null | undefined {
        return this.all?.filter((item) => item.recommended);
    }
}
