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
            new VCLPushDelegate("some_url", "some_token")
        );

        expect(subject.endpoint).toEqual(
            decodeURIComponent(CredentialManifestDescriptorMocks.DeepLinkRequestUri) + "&push_delegate.push_url=some_url&push_delegate.push_token=some_token"
        )
        expect.stringMatching(
            encodeURI(CredentialManifestDescriptorMocks.DeepLinkRequestUri)
        );
        expect(subject.did).toEqual(
            CredentialManifestDescriptorMocks.IssuerDid
        );
        expect(subject.issuingType).toEqual(VCLIssuingType.Career);
        expect(subject.pushDelegate?.pushUrl).toEqual("some_url");
        expect(subject.pushDelegate?.pushToken).toEqual("some_token");
    });
});
