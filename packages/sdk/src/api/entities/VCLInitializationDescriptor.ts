/*
data class VCLInitializationDescriptor(
    val context: Context,
    val environment: VCLEnvironment = VCLEnvironment.PROD,
    val cacheSequence: Int = 0
)
*/

import VCLEnvironment from "../VCLEnvironment";
import VCLCryptoServicesDescriptor from "./VCLCryptoServicesDescriptor";

export default class VCLInitializationDescriptor {
    constructor(
        public readonly environment: VCLEnvironment = VCLEnvironment.PROD,
        public readonly cryptoServicesDescriptor: VCLCryptoServicesDescriptor = new VCLCryptoServicesDescriptor()
    ) {}
}
