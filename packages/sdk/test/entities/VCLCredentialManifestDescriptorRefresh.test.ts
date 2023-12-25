import VCLCredentialManifestDescriptorRefresh from "../../src/api/entities/VCLCredentialManifestDescriptorRefresh";
import VCLService from "../../src/api/entities/VCLService";
import { CredentialManifestDescriptorMocks } from "../infrastructure/resources/valid/CredentialManifestDescriptorMocks";
import "../../src/impl/extensions/StringExtensions";

describe("VCLCredentialManifestDescriptorRefresh Tests", () => {
    let subject: VCLCredentialManifestDescriptorRefresh;

    test("testCredentialManifestDescriptorWith2CredentialIdsSuccess", () => {
        const service = new VCLService(
            JSON.parse(CredentialManifestDescriptorMocks.IssuingServiceJsonStr)
        );
        subject = new VCLCredentialManifestDescriptorRefresh(service, [
            CredentialManifestDescriptorMocks.CredentialId1,
            CredentialManifestDescriptorMocks.CredentialId2,
        ]);

        const credentialTypesQuery = `${
            VCLCredentialManifestDescriptorRefresh.KeyRefresh
        }=true&${
            VCLCredentialManifestDescriptorRefresh.KeyCredentialId
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.CredentialId1
        )}&${
            VCLCredentialManifestDescriptorRefresh.KeyCredentialId
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.CredentialId2
        )}`;
        const mockEndpoint = `${CredentialManifestDescriptorMocks.IssuingServiceEndPoint}?${credentialTypesQuery}`;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });

    test("testCredentialManifestDescriptorWith1CredentialIdsSuccess", () => {
        const service = new VCLService(
            JSON.parse(CredentialManifestDescriptorMocks.IssuingServiceJsonStr)
        );
        subject = new VCLCredentialManifestDescriptorRefresh(service, [
            CredentialManifestDescriptorMocks.CredentialId1,
        ]);

        const credentialTypesQuery = `${
            VCLCredentialManifestDescriptorRefresh.KeyRefresh
        }=true&${
            VCLCredentialManifestDescriptorRefresh.KeyCredentialId
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.CredentialId1
        )}`;
        const mockEndpoint = `${CredentialManifestDescriptorMocks.IssuingServiceEndPoint}?${credentialTypesQuery}`;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });

    test("testCredentialManifestDescriptorWith0CredentialIdsSuccess", () => {
        const service = new VCLService(
            JSON.parse(CredentialManifestDescriptorMocks.IssuingServiceJsonStr)
        );
        subject = new VCLCredentialManifestDescriptorRefresh(service, []);

        const credentialTypesQuery = `${VCLCredentialManifestDescriptorRefresh.KeyRefresh}=true`;
        const mockEndpoint = `${CredentialManifestDescriptorMocks.IssuingServiceEndPoint}?${credentialTypesQuery}`;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });
});
