/*
interface VCLJwtSignService {
    fun sign(
        kid: String? = null,
        nonce: String? = null,
        jwtDescriptor: VCLJwtDescriptor,
        remoteCryptoServicesToken: VCLToken? = null,
        completionBlock: (VCLResult<VCLJwt>) -> Unit
    )
}*/

import VCLJwt from "../entities/VCLJwt";
import VCLJwtDescriptor from "../entities/VCLJwtDescriptor";
import VCLResult from "../entities/VCLResult";
import VCLToken from "../entities/VCLToken";

export default interface VCLJwtSignService {
    sign(
        kid: Nullish<string>,
        nonce: Nullish<string>,
        jwtDescriptor: VCLJwtDescriptor,
        remoteCryptoServicesToken: Nullish<VCLToken>
    ): Promise<VCLResult<VCLJwt>>;
}
