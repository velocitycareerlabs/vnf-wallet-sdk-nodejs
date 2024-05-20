import { VCLOffer } from "../../../api/entities/VCLOffer";
import { Dictionary } from "../../../api/VCLTypes";

export class Utils {
    static offersFromJsonArray(offersJsonArray: Dictionary<any>[]): VCLOffer[] {
        const allOffers: VCLOffer[] = [];
        for (let i = 0; i < offersJsonArray.length; i++) {
            const offerJsonObject = offersJsonArray[i];
            if (offerJsonObject) {
                allOffers.push(new VCLOffer(offerJsonObject));
            }
        }
        return allOffers;
    }
}
