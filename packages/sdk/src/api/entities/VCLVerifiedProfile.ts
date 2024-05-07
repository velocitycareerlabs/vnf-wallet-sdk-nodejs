import { Dictionary, Nullish } from "../VCLTypes";
import VCLServiceType, { serviceTypeFromString } from "./VCLServiceType";
import VCLServiceTypes from "./VCLServiceTypes";

export default class VCLVerifiedProfile {
    constructor(public readonly payload: Dictionary<any>) {}

    retrieveServiceTypes(serviceCategoriesJsonArr: any[]) {
        const result: VCLServiceType[] = [];
        if (serviceCategoriesJsonArr) {
            for (let i = 0; i < serviceCategoriesJsonArr.length; i++) {
                result.push(
                    VCLServiceType[
                        serviceCategoriesJsonArr[i] as keyof typeof VCLServiceType
                    ]
                );
            }
        }
        return new VCLServiceTypes(result);
    }

    get credentialSubject(): Nullish<Dictionary<any>> {
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
            (this.credentialSubject ? this.credentialSubject[VCLVerifiedProfile.KeyServiceType] : [])
        );
    }

    static readonly KeyCredentialSubject = "credentialSubject";
    static readonly KeyName = "name";
    static readonly KeyLogo = "logo";
    static readonly KeyId = "id";
    static readonly KeyServiceType = "permittedVelocityServiceCategory";
}
