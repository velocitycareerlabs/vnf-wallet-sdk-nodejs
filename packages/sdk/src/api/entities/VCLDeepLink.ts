export default class VCLDeepLink {
    constructor(public value: string) {}

    get issuer(): Nullish<string> {
        return this.generateUri(VCLDeepLink.KeyIssuer, true);
    }

    get requestUri(): Nullish<string> {
        return this.generateUri(VCLDeepLink.KeyRequestUri);
    }

    get did(): Nullish<string> {
        return (
            this.requestUri?.getUrlSubPath(VCLDeepLink.KeyDidPrefix) ??
            this.issuer?.getUrlSubPath(VCLDeepLink.KeyDidPrefix)
        );
    }

    get vendorOriginContext(): Nullish<string> {
        return this.retrieveVendorOriginContext();
    }

    private generateUri(
        uriKey: string,
        asSubParams: boolean = false
    ): Nullish<string> {
        const queryParams = this.value.getQueryParameters();
        const uri = queryParams.get(uriKey);
        if (uri) {
            const queryItems = [...queryParams.entries()]
                .filter((it) => it[0] !== uriKey && it[1] !== "")
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .sort()
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

    retrieveVendorOriginContext(): Nullish<string> {
        return decodeURI(this.value)
            .getQueryParameters()
            ?.get(VCLDeepLink.KeyVendorOriginContext);
    }

    // CodingKeys
    static readonly KeyDidPrefix = "did:";
    static readonly KeyIssuer = "issuer";
    static readonly KeyRequestUri = "request_uri";
    static readonly KeyVendorOriginContext = "vendorOriginContext";
}
