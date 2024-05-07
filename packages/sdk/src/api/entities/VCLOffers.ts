import { Dictionary } from "../../api/VCLTypes";
import VCLToken from "./VCLToken";

export default class VCLOffers {
    constructor(
        public readonly all: Dictionary<any>[],
        public readonly responseCode: number,
        public readonly token: VCLToken
    ) {}
}
