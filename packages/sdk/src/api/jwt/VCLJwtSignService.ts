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

import VCLDidJwk from "../entities/VCLDidJwk";
import VCLJwt from "../entities/VCLJwt";
import VCLJwtDescriptor from "../entities/VCLJwtDescriptor";
import VCLResult from "../entities/VCLResult";

export default interface VCLJwtSignService {
    sign(
        jwtDescriptor: VCLJwtDescriptor,
        didJwk: VCLDidJwk,
        nonce: string | null | undefined
    ): Promise<VCLResult<VCLJwt>>;
}
