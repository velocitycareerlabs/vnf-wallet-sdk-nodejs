import { randomUUID } from "crypto";
import VCLDidJwk from "./VCLDidJwk";

export default class VCLJwtDescriptor {
    constructor(
        public payload: JSONObject,
        public iss: string,
        public jti: string = randomUUID().toString(),
        public keyId: Nullish<string>,
        public didJwk: Nullish<VCLDidJwk> = null,
        public aud: Nullish<string> = null
    ) {}
}
