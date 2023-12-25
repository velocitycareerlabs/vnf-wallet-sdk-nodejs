enum VCLServiceType {
    Inspector = "Inspector",
    Issuer = "Issuer",
    IdentityIssuer = "IdentityIssuer",
    NotaryIssuer = "NotaryIssuer",
    CareerIssuer = "CareerIssuer",
    Undefined = "Undefined",
}
export default VCLServiceType;

export const serviceTypeFromString = (value: string): VCLServiceType => {
    if (value.includes(VCLServiceType.Inspector)) {
        return VCLServiceType.Inspector;
    }
    if (value.includes(VCLServiceType.NotaryIssuer)) {
        return VCLServiceType.NotaryIssuer;
    }
    if (value.includes(VCLServiceType.IdentityIssuer)) {
        return VCLServiceType.IdentityIssuer;
    }
    if (value.includes(VCLServiceType.CareerIssuer)) {
        return VCLServiceType.CareerIssuer;
    }
    if (value.includes(VCLServiceType.Issuer)) {
        return VCLServiceType.Issuer;
    }
    return VCLServiceType.Undefined;
};
