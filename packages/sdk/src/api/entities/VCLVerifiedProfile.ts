/*

data class VCLVerifiedProfile(val payload: JSONObject) {

    val credentialSubject: JSONObject? get() = payload.optJSONObject(KeyCredentialSubject)

    val name get() = credentialSubject?.optString(KeyName)
    val logo get() = credentialSubject?.optString(KeyLogo)
    val id get() = credentialSubject?.optString(KeyId)
    val serviceTypes get() = retrieveServiceTypes(credentialSubject?.optJSONArray(KeyServiceType))

   

    companion object CodingKeys {
        const val KeyCredentialSubject = "credentialSubject"

        const val KeyName = "name"
        const val KeyLogo = "logo"
        const val KeyId = "id"
        const val KeyServiceType = "permittedVelocityServiceCategory"
    }
}
*/

import { Nullish } from "../../types";
import VCLServiceType from "./VCLServiceType";
import VCLServiceTypes from "./VCLServiceTypes";

export default class VCLVerifiedProfile {
    constructor(public readonly payload: JSONObject) {}

    retrieveServiceTypes(serviceCategoriesJsonArr: JSONObject[]) {
        const result: VCLServiceType[] = [];
        if (serviceCategoriesJsonArr) {
            for (let i = 0; i < serviceCategoriesJsonArr.length; i++) {
                result.push(
                    VCLServiceType[
                        serviceCategoriesJsonArr[
                            i
                        ] as keyof typeof VCLServiceType
                    ]
                );
            }
        }
        return new VCLServiceTypes(result);
    }

    get credentialSubject(): Nullish<JSONObject> {
        return this.payload[VCLVerifiedProfile.KeyCredentialSubject];
    }

    get name(): Nullish<string> {
        return this.payload[VCLVerifiedProfile.KeyName];
    }

    get logo(): Nullish<string> {
        return this.payload[VCLVerifiedProfile.KeyLogo];
    }

    get id(): Nullish<string> {
        return this.payload[VCLVerifiedProfile.KeyId];
    }

    get serviceTypes() {
        return this.retrieveServiceTypes(
            this.credentialSubject[VCLVerifiedProfile.KeyServiceType]
        );
    }

    static readonly KeyCredentialSubject = "credentialSubject";
    static readonly KeyName = "name";
    static readonly KeyLogo = "logo";
    static readonly KeyId = "id";
    static readonly KeyServiceType = "permittedVelocityServiceCategory";
}
