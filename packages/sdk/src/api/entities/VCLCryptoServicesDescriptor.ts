import VCLCryptoServiceType from "../VCLCryptoServiceType";
import VCLInjectedCryptoServicesDescriptor from "./VCLInjectedCryptoServicesDescriptor";
import VCLRemoteCryptoServicesUrlsDescriptor from "./VCLRemoteCryptoServicesUrlsDescriptor";

export default class VCLCryptoServicesDescriptor {
    constructor(
        readonly cryptoServiceType: VCLCryptoServiceType = VCLCryptoServiceType.Local,
        readonly injectedCryptoServicesDescriptor: Nullish<VCLInjectedCryptoServicesDescriptor> = null,
        readonly remoteCryptoServicesUrlsDescriptor: Nullish<VCLRemoteCryptoServicesUrlsDescriptor> = null
    ) {}
}
