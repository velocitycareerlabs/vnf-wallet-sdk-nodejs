import VCLJwt from "../entities/VCLJwt";
import VCLPublicJwk from "../entities/VCLPublicJwk";
import VCLResult from "../entities/VCLResult";
import { Nullish } from "../VCLTypes";

export default interface VCLJwtVerifyService {
    verify(jwt: VCLJwt, publicJwk: Nullish<VCLPublicJwk>): Promise<VCLResult<boolean>>;
}
