export default class VCLJwtDescriptor {
    constructor(
        public payload: JSONObject,
        public iss: string,
        public jti: string
    ) {}
}
