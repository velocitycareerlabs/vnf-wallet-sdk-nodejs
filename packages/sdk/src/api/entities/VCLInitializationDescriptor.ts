/*
data class VCLInitializationDescriptor(
    val context: Context,
    val environment: VCLEnvironment = VCLEnvironment.PROD,
    val cacheSequence: Int = 0
)
*/

import VCLEnvironment from "../VCLEnvironment";

export default class VCLInitializationDescriptor {
    constructor(
        public readonly environment: VCLEnvironment = VCLEnvironment.PROD
    ) {}
}
