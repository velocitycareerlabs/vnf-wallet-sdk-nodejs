import VCLServiceType, {
    serviceTypeFromString,
} from "../../src/api/entities/VCLServiceType";

describe("VCLServiceType Tests", () => {
    test("testFromExactString", () => {
        expect(serviceTypeFromString("Issuer")).toBe(VCLServiceType.Issuer);
        expect(serviceTypeFromString("Inspector")).toBe(
            VCLServiceType.Inspector
        );
        expect(serviceTypeFromString("CareerIssuer")).toBe(
            VCLServiceType.CareerIssuer
        );
        expect(serviceTypeFromString("NotaryIssuer")).toBe(
            VCLServiceType.NotaryIssuer
        );
        expect(serviceTypeFromString("IdentityIssuer")).toBe(
            VCLServiceType.IdentityIssuer
        );
        expect(serviceTypeFromString("OtherService")).toBe(
            VCLServiceType.Undefined
        );
        expect(serviceTypeFromString("Undefined")).toBe(
            VCLServiceType.Undefined
        );
    });

    test("testFromNonExactString", () => {
        expect(serviceTypeFromString("11_Issuer6_2")).toBe(
            VCLServiceType.Issuer
        );
        expect(serviceTypeFromString("hyre_8Inspector09_nf")).toBe(
            VCLServiceType.Inspector
        );
        expect(serviceTypeFromString("9jfCareerIssuer@#$%")).toBe(
            VCLServiceType.CareerIssuer
        );
        expect(serviceTypeFromString(")64fhsNotaryIssuer")).toBe(
            VCLServiceType.NotaryIssuer
        );
        expect(serviceTypeFromString("IdentityIssuer05%#Rg&*")).toBe(
            VCLServiceType.IdentityIssuer
        );
        expect(serviceTypeFromString("ksdjhkD#OtherService959)%")).toBe(
            VCLServiceType.Undefined
        );
        expect(serviceTypeFromString("#Wfg85$Undefined)%dgsc")).toBe(
            VCLServiceType.Undefined
        );
        expect(serviceTypeFromString("")).toBe(VCLServiceType.Undefined);
    });
});
