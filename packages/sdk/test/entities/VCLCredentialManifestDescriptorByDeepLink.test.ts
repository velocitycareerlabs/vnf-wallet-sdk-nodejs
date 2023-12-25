/* import { CredentialManifestDescriptorMocks } from "path-to-your-mocks"; */
import VCLCredentialManifestDescriptorByDeepLink from "../../src/api/entities/VCLCredentialManifestDescriptorByDeepLink";
import VCLIssuingType from "../../src/api/entities/VCLIssuingType";
import { CredentialManifestDescriptorMocks } from "../infrastructure/resources/valid/CredentialManifestDescriptorMocks";
import "../../src/impl/extensions/StringExtensions";

describe("VCLCredentialManifestDescriptorByDeepLink Tests", () => {
    let subject: VCLCredentialManifestDescriptorByDeepLink;

    beforeEach(() => {
        // Setup code before each test
    });

    test("testCredentialManifestDescriptorFullValidByDeepLinkSuccess", () => {
        subject = new VCLCredentialManifestDescriptorByDeepLink(
            CredentialManifestDescriptorMocks.DeepLink,
            VCLIssuingType.Career
        );

        expect.stringMatching(
            encodeURI(CredentialManifestDescriptorMocks.DeepLinkRequestUri)
        );
        expect(subject.did).toEqual(
            CredentialManifestDescriptorMocks.IssuerDid
        );
    });
});
