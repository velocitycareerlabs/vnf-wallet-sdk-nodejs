import VCLServiceTypes from "./VCLServiceTypes";

export default class VCLOrganizationsSearchDescriptor {
    constructor(
        public readonly filter: VCLFilter | null | undefined = null,
        public readonly page: VCLPage | null | undefined = null,
        /**
         * A array of tuples indicating the field to sort by
         */
        public readonly sort: string[][] | null | undefined = null,
        /**
         * Full Text search for the name property of the organization
         * Matches on partials strings
         * Prefer results that are the first word of the name, or first letter of a word
         */
        public readonly query: string | null | undefined = null
    ) {}

    public readonly queryParams = this.generateQueryParams();

    private generateQueryParams(): string | null | undefined {
        const pFilterDid =
            this.filter?.did &&
            `${VCLOrganizationsSearchDescriptor.KeyFilterDid}=${this.filter.did}`;

        const pFilterServiceTypes =
            this.filter?.serviceTypes?.all &&
            `${
                VCLOrganizationsSearchDescriptor.KeyFilterServiceTypes
            }=${this.filter.serviceTypes.all
                .map((i) => encodeURIComponent(i))
                .join(",")}`;
        const pFilterCredentialTypes =
            this.filter?.credentialTypes &&
            `${
                VCLOrganizationsSearchDescriptor.KeyFilterCredentialTypes
            }=${this.filter.credentialTypes
                .map((credentialType) => encodeURIComponent(credentialType))
                .join(",")}`;
        const pSort = this.sort
            ?.map(
                (list, index) =>
                    `${
                        VCLOrganizationsSearchDescriptor.KeySort
                    }[${index}]=${list.join(",")}`
            )
            ?.join("&");
        const pPageSkip =
            this.page?.skip &&
            `${
                VCLOrganizationsSearchDescriptor.KeyPageSkip
            }=${encodeURIComponent(this.page.skip)}`;
        const pPageSize =
            this.page?.size &&
            `${
                VCLOrganizationsSearchDescriptor.KeyPageSize
            }=${encodeURIComponent(this.page.size)}`;

        const pQuery =
            this.query &&
            `${VCLOrganizationsSearchDescriptor.KeyQueryQ}=${encodeURIComponent(
                this.query
            )}`;

        const qParams = [
            pFilterDid,
            pFilterServiceTypes,
            pFilterCredentialTypes,
            pSort,
            pPageSkip,
            pPageSize,
            pQuery,
        ].filter((qParam) => !!qParam);
        return qParams.length === 0 ? null : qParams.join("&");
    }

    static readonly KeyQueryQ = "q";
    static readonly KeySort = "sort";
    static readonly KeyFilterDid = "filter.did";
    static readonly KeyFilterServiceTypes = "filter.serviceTypes";
    static readonly KeyFilterCredentialTypes = "filter.credentialTypes";
    static readonly KeyPageSkip = "page.skip";
    static readonly KeyPageSize = "page.size";
}

export class VCLFilter {
    constructor(
        /**
         * Filters organizations based on DIDs
         */
        public readonly did: string | null | undefined = null,
        /**
         * Filters organizations based on Service Types e.g. [VCLServiceType]
         */
        public readonly serviceTypes: VCLServiceTypes | null | undefined = null,
        /**
         * Filters organizations based on credential types e.g. [EducationDegree]
         */
        public readonly credentialTypes: string[] | null | undefined = null
    ) {}
}

export class VCLPage {
    constructor(
        /**
         * The number of records to retrieve
         */
        public readonly size: string | null | undefined = null,
        /**
         * The objectId to skip
         */
        public readonly skip: string | null | undefined = null
    ) {}
}
