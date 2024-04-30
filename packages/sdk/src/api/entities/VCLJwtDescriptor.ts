import { randomUUID } from "crypto";
import VCLDidJwk from "./VCLDidJwk";

export default class VCLJwtDescriptor {
    constructor(
        public payload: JSONObject,
        public iss: string,
        public jti: string = randomUUID().toString(),
        public keyId: string | null | undefined,
        public didJwk: VCLDidJwk | null | undefined = null,
        public aud: string | null | undefined = null
    ) {}
}
