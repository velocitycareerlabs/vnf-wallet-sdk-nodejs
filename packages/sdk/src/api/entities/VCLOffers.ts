import VCLToken from "./VCLToken";

export default class VCLOffers {
    constructor(
        public readonly all: JSONObject[],
        public readonly responseCode: number,
        public readonly token: VCLToken,
        public readonly challenge?: string,
    ) {}
}
