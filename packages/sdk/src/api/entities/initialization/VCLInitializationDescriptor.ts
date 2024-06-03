import VCLEnvironment from "../../VCLEnvironment";
import VCLCryptoServicesDescriptor from "./VCLCryptoServicesDescriptor";
import VCLXVnfProtocolVersion from "../../VCLXVnfProtocolVersion";

export default class VCLInitializationDescriptor {
    constructor(
        public readonly environment: VCLEnvironment = VCLEnvironment.Prod,
        public readonly xVnfProtocolVersion: VCLXVnfProtocolVersion = VCLXVnfProtocolVersion.XVnfProtocolVersion1,
        public readonly cryptoServicesDescriptor: VCLCryptoServicesDescriptor
    ) {}
}
