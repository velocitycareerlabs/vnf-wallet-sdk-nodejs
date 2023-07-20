import VCLJwt from "./VCLJwt";

export default class VCLJwtVerifiableCredentials {
    constructor(public readonly all: VCLJwt[]) {}
}
