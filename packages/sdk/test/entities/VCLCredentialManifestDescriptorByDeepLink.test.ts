/* import { CredentialManifestDescriptorMocks } from "path-to-your-mocks"; */
import VCLCredentialManifestDescriptorByDeepLink from "../../src/api/entities/VCLCredentialManifestDescriptorByDeepLink";
import VCLIssuingType from "../../src/api/entities/VCLIssuingType";
import { CredentialManifestDescriptorMocks } from "../infrastructure/resources/valid/CredentialManifestDescriptorMocks";
import "../../src/impl/extensions/StringExtensions";
import VCLPushDelegate from "../../src/api/entities/VCLPushDelegate";

describe("VCLCredentialManifestDescriptorByDeepLink Tests", () => {
    let subject: VCLCredentialManifestDescriptorByDeepLink;

    beforeEach(() => {
        // Setup code before each test
    });

    test("testCredentialManifestDescriptorFullValidByDeepLinkSuccess", () => {
        subject = new VCLCredentialManifestDescriptorByDeepLink(
            CredentialManifestDescriptorMocks.DeepLink,
            VCLIssuingType.Career,
            new VCLPushDelegate("some push url", "some push token")
        );

        expect.stringMatching(
            encodeURI(CredentialManifestDescriptorMocks.DeepLinkRequestUri)
        );
        expect(subject.did).toEqual(
            CredentialManifestDescriptorMocks.IssuerDid
        );
        expect(subject.issuingType).toEqual(VCLIssuingType.Career);
        expect(subject.pushDelegate?.pushUrl).toEqual("some push url");
        expect(subject.pushDelegate?.pushToken).toEqual("some push token");
    });
});
