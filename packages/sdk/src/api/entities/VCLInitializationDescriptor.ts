import VCLEnvironment from "../VCLEnvironment";
import VCLCryptoServicesDescriptor from "./VCLCryptoServicesDescriptor";

export default class VCLInitializationDescriptor {
    constructor(
        public readonly environment: VCLEnvironment = VCLEnvironment.PROD,
        public readonly cryptoServicesDescriptor: VCLCryptoServicesDescriptor
    ) {}
}
