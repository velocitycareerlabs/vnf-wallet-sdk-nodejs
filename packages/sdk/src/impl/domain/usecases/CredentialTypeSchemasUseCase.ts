/*
internal interface CredentialTypeSchemasUseCase {
    fun getCredentialTypeSchemas(
        cacheSequence: Int,
        completionBlock:(VCLResult<VCLCredentialTypeSchemas>) -> Unit
    )
}*/

import VCLCredentialTypeSchemas from "../../../api/entities/VCLCredentialTypeSchemas";
import VCLResult from "../../../api/entities/VCLResult";

export default interface CredentialTypeSchemasUseCase {
    getCredentialTypeSchemas(): Promise<VCLResult<VCLCredentialTypeSchemas>>;
}
