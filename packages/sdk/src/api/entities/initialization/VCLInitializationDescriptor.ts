import VCLEnvironment from "../../VCLEnvironment";
import VCLCryptoServicesDescriptor from "./VCLCryptoServicesDescriptor";
import VCLXVnfProtocolVersion from "../../VCLXVnfProtocolVersion";
import { VCLLogService } from "./VCLLogService";
import pino from "pino";

export default class VCLInitializationDescriptor {
    constructor(
        public readonly environment: VCLEnvironment = VCLEnvironment.Prod,
        public readonly xVnfProtocolVersion: VCLXVnfProtocolVersion = VCLXVnfProtocolVersion.XVnfProtocolVersion1,
        public readonly cryptoServicesDescriptor: VCLCryptoServicesDescriptor,
        public readonly logService: VCLLogService = pino()
    ) {}
}
