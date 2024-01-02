/* enum class VCLCryptoServiceType(val value: String) {
    Local("local"),
    Remote("remote"),
    Injected("injected");

    companion object {
        fun fromString(value: String) =
            when (value) {
                Local.value -> Local
                Remote.value -> Remote
                Injected.value -> Injected
                else -> Local
            }
    }
} */

enum VCLCryptoServiceType {
    Local = "local",
    Remote = "remote",
    Injected = "injected",
}

export const cryptoServiceTypeFromString = (value: string) => {
    if (value === VCLCryptoServiceType.Local) {
        return VCLCryptoServiceType.Local;
    } else if (value === VCLCryptoServiceType.Remote) {
        return VCLCryptoServiceType.Remote;
    } else if (value === VCLCryptoServiceType.Injected) {
        return VCLCryptoServiceType.Injected;
    }
};

export default VCLCryptoServiceType;
