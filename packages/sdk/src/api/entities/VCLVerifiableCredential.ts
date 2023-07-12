export default class VCLVerifiableCredential {
    constructor(
        public readonly inputDescriptor: string,
        public readonly jwtVc: string
    ) {}
}
