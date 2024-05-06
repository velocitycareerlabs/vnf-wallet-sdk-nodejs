import "../../impl/extensions/StringExtensions";
import { Nullish } from "../Nullish";

export default class VCLDeepLink {
    public requestUri: Nullish<string>;
    public vendorOriginContext: Nullish<string>;

    constructor(public value: string) {
        this.vendorOriginContext = this.getVendorOriginContext();
        this.requestUri = this.getRequestUri();
    }

    private getRequestUri(): Nullish<string> {
        return this.generateUri(VCLDeepLink.KeyRequestUri);
    }

    public get did(): Nullish<string> {
        return (
            this.retrieveQueryParam(VCLDeepLink.KeyIssuerDid) ??
            this.retrieveQueryParam(VCLDeepLink.KeyInspectorDid) ??
            this.requestUri?.getUrlSubPath(VCLDeepLink.KeyDidPrefix) // fallback for old agents
        );
    }

    private getVendorOriginContext(): Nullish<string> {
        return this.retrieveQueryParam(VCLDeepLink.KeyVendorOriginContext);
    }

    private generateUri(
        uriKey: string,
        asSubParams = false
    ): Nullish<string> {
        const queryParams = this.value.getQueryParameters();
        const uri = queryParams.get(uriKey);
        if (uri) {
            const queryItems = [...queryParams.entries()]
                .filter((it) => it[0] !== uriKey && it[1] !== "")
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join("&");
            if (queryItems.length > 0) {
                return asSubParams
                    ? `${uri}&${queryItems}`
                    : uri.appendQueryParams(queryItems);
            }

            return uri;
        }

        return null;
    }

    retrieveQueryParam(key: string): Nullish<string> {
        return decodeURIComponent(this.value).getQueryParameters()?.get(key);
    }

    // CodingKeys
    static readonly KeyDidPrefix = "did:";
    static readonly KeyRequestUri = "request_uri";
    static readonly KeyVendorOriginContext = "vendorOriginContext";
    static readonly KeyIssuerDid = "issuerDid";
    static readonly KeyInspectorDid = "inspectorDid";
}
