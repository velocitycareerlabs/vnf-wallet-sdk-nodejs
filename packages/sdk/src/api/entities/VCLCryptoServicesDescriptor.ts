import VCLInjectedCryptoServicesDescriptor from "./VCLInjectedCryptoServicesDescriptor";
import VCLRemoteCryptoServicesUrlsDescriptor from "./VCLRemoteCryptoServicesUrlsDescriptor";

export default class VCLCryptoServicesDescriptor {
    constructor(
        readonly injectedCryptoServicesDescriptor: Nullish<VCLInjectedCryptoServicesDescriptor> = null
    ) {}
}
