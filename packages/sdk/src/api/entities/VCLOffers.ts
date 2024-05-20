import { Dictionary, Nullish } from "../VCLTypes";
import VCLToken from "./VCLToken";
import { VCLOffer } from "./VCLOffer";

export default class VCLOffers {
    constructor(
        public readonly payload: Dictionary<any>,
        public readonly all: VCLOffer[],
        public readonly responseCode: number,
        public readonly token: VCLToken,
        public readonly challenge: Nullish<string> = null
    ) {}

    static CodingKeys = {
        KeyOffers: "offers",
        KeyChallenge: "challenge"
    };
}
