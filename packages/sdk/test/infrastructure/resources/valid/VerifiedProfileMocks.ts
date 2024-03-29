class VerifiedProfileMocks {
    static readonly ExpectedId =
        "did:velocity:0x2bef092530ccc122f5fe439b78eddf6010685e88";

    static readonly ExpectedLogo =
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/University_of_Massachusetts_Amherst_seal.svg/1200px-University_of_Massachusetts_Amherst_seal.svg.png";

    static readonly ExpectedName = "University of Massachusetts Amherst";

    static readonly VerifiedProfileIssuerInspectorJsonStr =
        '{"id":"f7301eae-35ac-4b6a-acc7-8f00bb65b714","type":["VerifiableCredential"],"issuer":{"id":"did:velocity:0x7c98a6cea317ec176ba865a42d3eae639dfe9fb1"},"credentialSubject":{"name":"University of Massachusetts Amherst","logo":"https:\\/\\/upload.wikimedia.org\\/wikipedia\\/en\\/thumb\\/4\\/4f\\/University_of_Massachusetts_Amherst_seal.svg\\/1200px-University_of_Massachusetts_Amherst_seal.svg.png","location":{"countryCode":"US","regionCode":"MA"},"website":"https:\\/\\/example.com","permittedVelocityServiceCategories":[null,"Issuer","Inspector"],"permittedVelocityServiceCategory":["Issuer","Inspector"],"id":"did:velocity:0x2bef092530ccc122f5fe439b78eddf6010685e88"},"issued":"2021-09-15T09:04:10.000Z","credentialChecks":{"checked":"2021-10-31T10:40:51.292Z","TRUSTED_ISSUER":"PASS","UNREVOKED":"NOT_CHECKED","UNEXPIRED":"NOT_APPLICABLE","UNTAMPERED":"PASS"}}';

    static readonly VerifiedProfileIssuerJsonStr =
        '{"id":"f7301eae-35ac-4b6a-acc7-8f00bb65b714","type":["VerifiableCredential"],"issuer":{"id":"did:velocity:0x7c98a6cea317ec176ba865a42d3eae639dfe9fb1"},"credentialSubject":{"name":"University of Massachusetts Amherst","logo":"https:\\/\\/upload.wikimedia.org\\/wikipedia\\/en\\/thumb\\/4\\/4f\\/University_of_Massachusetts_Amherst_seal.svg\\/1200px-University_of_Massachusetts_Amherst_seal.svg.png","location":{"countryCode":"US","regionCode":"MA"},"website":"https:\\/\\/example.com","permittedVelocityServiceCategories":[null,"Issuer","Inspector"],"permittedVelocityServiceCategory":["Issuer"],"id":"did:velocity:0x2bef092530ccc122f5fe439b78eddf6010685e88"},"issued":"2021-09-15T09:04:10.000Z","credentialChecks":{"checked":"2021-10-31T10:40:51.292Z","TRUSTED_ISSUER":"PASS","UNREVOKED":"NOT_CHECKED","UNEXPIRED":"NOT_APPLICABLE","UNTAMPERED":"PASS"}}';

    static readonly VerifiedProfileNotaryIssuerJsonStr =
        '{"id":"f7301eae-35ac-4b6a-acc7-8f00bb65b714","type":["VerifiableCredential"],"issuer":{"id":"did:velocity:0x7c98a6cea317ec176ba865a42d3eae639dfe9fb1"},"credentialSubject":{"name":"University of Massachusetts Amherst","logo":"https:\\/\\/upload.wikimedia.org\\/wikipedia\\/en\\/thumb\\/4\\/4f\\/University_of_Massachusetts_Amherst_seal.svg\\/1200px-University_of_Massachusetts_Amherst_seal.svg.png","location":{"countryCode":"US","regionCode":"MA"},"website":"https:\\/\\/example.com","permittedVelocityServiceCategories":[null,"Issuer","Inspector"],"permittedVelocityServiceCategory":["NotaryIssuer"],"id":"did:velocity:0x2bef092530ccc122f5fe439b78eddf6010685e88"},"issued":"2021-09-15T09:04:10.000Z","credentialChecks":{"checked":"2021-10-31T10:40:51.292Z","TRUSTED_ISSUER":"PASS","UNREVOKED":"NOT_CHECKED","UNEXPIRED":"NOT_APPLICABLE","UNTAMPERED":"PASS"}}';

    static readonly VerifiedProfileInspectorJsonStr =
        '{"id":"f7301eae-35ac-4b6a-acc7-8f00bb65b714","type":["VerifiableCredential"],"issuer":{"id":"did:velocity:0x7c98a6cea317ec176ba865a42d3eae639dfe9fb1"},"credentialSubject":{"name":"University of Massachusetts Amherst","logo":"https:\\/\\/upload.wikimedia.org\\/wikipedia\\/en\\/thumb\\/4\\/4f\\/University_of_Massachusetts_Amherst_seal.svg\\/1200px-University_of_Massachusetts_Amherst_seal.svg.png","location":{"countryCode":"US","regionCode":"MA"},"website":"https:\\/\\/example.com","permittedVelocityServiceCategories":[null,"Issuer","Inspector"],"permittedVelocityServiceCategory":["Inspector"],"id":"did:velocity:0x2bef092530ccc122f5fe439b78eddf6010685e88"},"issued":"2021-09-15T09:04:10.000Z","credentialChecks":{"checked":"2021-10-31T10:40:51.292Z","TRUSTED_ISSUER":"PASS","UNREVOKED":"NOT_CHECKED","UNEXPIRED":"NOT_APPLICABLE","UNTAMPERED":"PASS"}}';
}
export { VerifiedProfileMocks };
