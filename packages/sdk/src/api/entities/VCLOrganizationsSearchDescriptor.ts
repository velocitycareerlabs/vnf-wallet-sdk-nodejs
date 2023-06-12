import VCLServiceTypes from "./VCLServiceTypes";

export default class VCLOrganizationsSearchDescriptor {
    constructor(
        public readonly filter: Nullish<VCLFilter> = null,
        public readonly page: Nullish<VCLPage> = null,
        /**
         * A array of tuples indicating the field to sort by
         */
        public readonly sort: Nullish<string[][]> = null,
        /**
         * Full Text search for the name property of the organization
         * Matches on partials strings
         * Prefer results that are the first word of the name, or first letter of a word
         */
        public readonly query: Nullish<string> = null
    ) {}
}

export class VCLFilter {
    constructor(
        /**
         * Filters organizations based on DIDs
         */
        public readonly did: Nullish<string> = null,
        /**
         * Filters organizations based on Service Types e.g. [VCLServiceType]
         */
        public readonly serviceTypes: Nullish<VCLServiceTypes> = null,
        /**
         * Filters organizations based on credential types e.g. [EducationDegree]
         */
        public readonly credentialTypes: Nullish<string[]> = null
    ) {}
}

export class VCLPage {
    constructor(
        /**
         * The number of records to retrieve
         */
        public readonly size: Nullish<string> = null,
        /**
         * The objectId to skip
         */
        public readonly skip: Nullish<string> = null
    ) {}
}
