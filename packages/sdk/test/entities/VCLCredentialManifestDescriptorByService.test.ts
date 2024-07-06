/* { VCLCredentialManifestDescriptorByService, VCLIssuingType, VCLServiceCredentialAgentIssuer } */
import VCLCredentialManifestDescriptorByService from "../../src/api/entities/VCLCredentialManifestDescriptorByService";
import { VCLIssuingType } from "../../src";
import VCLServiceCredentialAgentIssuer from "../../src/api/entities/VCLServiceCredentialAgentIssuer";
import "../../src/impl/extensions/StringExtensions";
import { CredentialManifestDescriptorMocks } from "../infrastructure/resources/valid/CredentialManifestDescriptorMocks";

import "../../src/impl/extensions/StringExtensions";
import { DidJwkMocks } from "../infrastructure/resources/valid/DidJwkMocks";

describe("VCLCredentialManifestDescriptorByService Tests", () => {
    let subject: VCLCredentialManifestDescriptorByService;

    test("testCredentialManifestDescriptorByServiceWithFullInput1Success", () => {
        const service = new VCLServiceCredentialAgentIssuer(
            JSON.parse(CredentialManifestDescriptorMocks.IssuingServiceJsonStr)
        );
        subject = new VCLCredentialManifestDescriptorByService(
            service,
            VCLIssuingType.Career,
            CredentialManifestDescriptorMocks.CredentialTypesList,
            CredentialManifestDescriptorMocks.PushDelegate,
            DidJwkMocks.DidJwk
        );

        const credentialTypesQuery = `${
            VCLCredentialManifestDescriptorByService.KeyCredentialTypes
        }=${CredentialManifestDescriptorMocks.CredentialTypesList[0]}&${
            VCLCredentialManifestDescriptorByService.KeyCredentialTypes
        }=${CredentialManifestDescriptorMocks.CredentialTypesList[1]}&${
            VCLCredentialManifestDescriptorByService.KeyPushDelegatePushUrl
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.PushDelegate.pushUrl
        )}&${
            VCLCredentialManifestDescriptorByService.KeyPushDelegatePushToken
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.PushDelegate.pushToken
        )}`;
        const mockEndpoint = `${CredentialManifestDescriptorMocks.IssuingServiceEndPoint}?${credentialTypesQuery}`;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });

    test("testCredentialManifestDescriptorByServiceWithFullInput2Success", () => {
        const service = new VCLServiceCredentialAgentIssuer(
            JSON.parse(CredentialManifestDescriptorMocks.IssuingServiceJsonStr)
        );
        subject = new VCLCredentialManifestDescriptorByService(
            service,
            VCLIssuingType.Identity,
            CredentialManifestDescriptorMocks.CredentialTypesList,
            CredentialManifestDescriptorMocks.PushDelegate,
            DidJwkMocks.DidJwk
        );

        const credentialTypesQuery = `${
            VCLCredentialManifestDescriptorByService.KeyCredentialTypes
        }=${CredentialManifestDescriptorMocks.CredentialTypesList[0]}&${
            VCLCredentialManifestDescriptorByService.KeyCredentialTypes
        }=${CredentialManifestDescriptorMocks.CredentialTypesList[1]}&${
            VCLCredentialManifestDescriptorByService.KeyPushDelegatePushUrl
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.PushDelegate.pushUrl
        )}&${
            VCLCredentialManifestDescriptorByService.KeyPushDelegatePushToken
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.PushDelegate.pushToken
        )}`;
        const mockEndpoint = `${CredentialManifestDescriptorMocks.IssuingServiceEndPoint}?${credentialTypesQuery}`;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });

    test("testCredentialManifestDescriptorByServiceWithPartialInput3Success", () => {
        const service = new VCLServiceCredentialAgentIssuer(
            JSON.parse(CredentialManifestDescriptorMocks.IssuingServiceJsonStr)
        );
        subject = new VCLCredentialManifestDescriptorByService(
            service,
            VCLIssuingType.Career,
            undefined,
            CredentialManifestDescriptorMocks.PushDelegate,
            DidJwkMocks.DidJwk
        );

        const credentialTypesQuery = `${
            VCLCredentialManifestDescriptorByService.KeyPushDelegatePushUrl
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.PushDelegate.pushUrl
        )}&${
            VCLCredentialManifestDescriptorByService.KeyPushDelegatePushToken
        }=${encodeURIComponent(
            CredentialManifestDescriptorMocks.PushDelegate.pushToken
        )}`;
        const mockEndpoint = `${CredentialManifestDescriptorMocks.IssuingServiceEndPoint}?${credentialTypesQuery}`;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });

    test("testCredentialManifestDescriptorByServiceWithPartialInput4Success", () => {
        const service = new VCLServiceCredentialAgentIssuer(
            JSON.parse(
                CredentialManifestDescriptorMocks.IssuingServiceWithParamJsonStr
            )
        );
        subject = new VCLCredentialManifestDescriptorByService(
            service,
            VCLIssuingType.Career,
            CredentialManifestDescriptorMocks.CredentialTypesList,
            null,
            DidJwkMocks.DidJwk
        );

        const credentialTypesQuery = `${VCLCredentialManifestDescriptorByService.KeyCredentialTypes}=${CredentialManifestDescriptorMocks.CredentialTypesList[0]}&${VCLCredentialManifestDescriptorByService.KeyCredentialTypes}=${CredentialManifestDescriptorMocks.CredentialTypesList[1]}`;
        const mockEndpoint = `${CredentialManifestDescriptorMocks.IssuingServiceWithParamEndPoint}&${credentialTypesQuery}`;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });

    test("testCredentialManifestDescriptorByServiceWithPartialInput5Success", () => {
        const service = new VCLServiceCredentialAgentIssuer(
            JSON.parse(
                CredentialManifestDescriptorMocks.IssuingServiceWithParamJsonStr
            )
        );
        subject = new VCLCredentialManifestDescriptorByService(
            service,
            VCLIssuingType.Career,
            null,
            null,
            DidJwkMocks.DidJwk
        );

        const mockEndpoint =
            CredentialManifestDescriptorMocks.IssuingServiceWithParamEndPoint;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });

    test("testCredentialManifestDescriptorByServiceWithPartialInput6Success", () => {
        const service = new VCLServiceCredentialAgentIssuer(
            JSON.parse(CredentialManifestDescriptorMocks.IssuingServiceJsonStr)
        );
        subject = new VCLCredentialManifestDescriptorByService(
            service,
            VCLIssuingType.Career,
            null,
            null,
            DidJwkMocks.DidJwk
        );

        const mockEndpoint =
            CredentialManifestDescriptorMocks.IssuingServiceEndPoint;

        expect(subject.endpoint).toBe(mockEndpoint);
        expect(subject.did).toBe(CredentialManifestDescriptorMocks.IssuerDid);
    });
});
