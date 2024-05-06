import { Nullish } from "../Nullish";
import VCLCredentialManifestDescriptor from "./VCLCredentialManifestDescriptor";
import VCLIssuingType from "./VCLIssuingType";
import VCLService from "./VCLService";

/*
class VCLCredentialManifestDescriptorRefresh(
    service: VCLService,
    val credentialIds: List<String>
): VCLCredentialManifestDescriptor(
    uri = service.serviceEndpoint,
    issuingType = VCLIssuingType.Refresh
) {
    override val endpoint =  generateQueryParams()?.let { queryParams ->
        val originUri = URI(uri)
        val allQueryParams =
            (originUri.query?.let { "&" } ?: "?") + "${KeyRefresh}=${true}&$queryParams"
        uri + allQueryParams
    } ?: "$uri?${KeyRefresh}=${true}"

    private fun generateQueryParams(): String? {
        val pCredentialIds = credentialIds.map {
            it.encode()
        }.joinToString(separator = "&") { "$KeyCredentialId=$it" }
        val qParams = listOfNotNull(pCredentialIds).filter { it.isNotBlank() }
        return if(qParams.isNotEmpty()) qParams.joinToString("&") else null
    }
}
*/
export default class VCLCredentialManifestDescriptorRefresh extends VCLCredentialManifestDescriptor {
    constructor(
        public readonly service: VCLService,
        public readonly credentialIds: string[]
    ) {
        super(service.serviceEndpoint, VCLIssuingType.Refresh);
    }

    get endpoint(): Nullish<string> {
        const queryParams = this.generateQueryParams();
        if (queryParams) {
            const originUri = this.uri!;
            const allQueryParams =
                (originUri.includes("?") ? "&" : "?") +
                `${VCLCredentialManifestDescriptorRefresh.KeyRefresh}=true&${queryParams}`;
            return this.uri + allQueryParams;
        }

        return `${this.uri!}?${
            VCLCredentialManifestDescriptorRefresh.KeyRefresh
        }=true`;
    }

    generateQueryParams() {
        const pCredentialIds = this.credentialIds
            .map(
                (it) =>
                    `${
                        VCLCredentialManifestDescriptorRefresh.KeyCredentialId
                    }=${encodeURIComponent(it)}`
            )
            .join("&");

        const qParams = [pCredentialIds].filter((c) => c && c.length);
        return qParams.length ? qParams.join("&") : null;
    }
}
