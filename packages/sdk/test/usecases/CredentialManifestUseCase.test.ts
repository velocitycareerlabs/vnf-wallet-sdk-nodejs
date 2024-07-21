import CredentialManifestUseCase from "../../src/impl/domain/usecases/CredentialManifestUseCase";
import CredentialManifestUseCaseImpl from "../../src/impl/data/usecases/CredentialManifestUseCaseImpl";
import CredentialManifestRepositoryImpl from "../../src/impl/data/repositories/CredentialManifestRepositoryImpl";
import NetworkServiceSuccess from "../NetworkServiceSuccess";
import { CredentialManifestMocks } from "../infrastructure/resources/valid/CredentialManifestMocks";
import ResolveKidRepositoryImpl from "../../src/impl/data/repositories/ResolveKidRepositoryImpl";
import JwtServiceRepositoryImpl from "../../src/impl/data/repositories/JwtServiceRepositoryImpl";
import { JwtSignServiceMock } from "../infrastructure/resources/jwt/JwtSignServiceMock";
import { JwtVerifyServiceMock } from "../infrastructure/resources/jwt/JwtVerifyServiceMock";
import {
    VCLCredentialManifestDescriptorByDeepLink, VCLErrorCode,
    VCLIssuingType, VCLToken,
    VCLVerifiedProfile
} from "../../src";
import { DeepLinkMocks } from "../infrastructure/resources/valid/DeepLinkMocks";
import { VerifiedProfileMocks } from "../infrastructure/resources/valid/VerifiedProfileMocks";
import { expect } from "@jest/globals";
import { DidJwkMocks } from "../infrastructure/resources/valid/DidJwkMocks";
import { CredentialManifestByDeepLinkVerifierImpl } from "../../src/impl/data/verifiers";

describe("CredentialManifestUseCase Tests", () => {

    let subject1: CredentialManifestUseCase
    let subject2: CredentialManifestUseCase

    test("testGetCredentialManifestSuccess", async () => {
        subject1 = new CredentialManifestUseCaseImpl(
            new CredentialManifestRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(CredentialManifestMocks.CredentialManifest1))
            ),
            new ResolveKidRepositoryImpl(
                new NetworkServiceSuccess(CredentialManifestMocks.JWK)
            ),
            new JwtServiceRepositoryImpl(
                new JwtSignServiceMock(''),
                new JwtVerifyServiceMock()
            ),
            new CredentialManifestByDeepLinkVerifierImpl()
        );

        try {
            const credentialManifest = await subject1.getCredentialManifest(
                new VCLCredentialManifestDescriptorByDeepLink(
                    DeepLinkMocks.CredentialManifestDeepLinkDevNet,
                    VCLIssuingType.Career,
                    null,
                    DidJwkMocks.DidJwk,
                    new VCLToken("some token")
                ),
                new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1))
            );
            expect(credentialManifest?.jwt.encodedJwt).toBe(CredentialManifestMocks.JwtCredentialManifest1);
            expect(credentialManifest?.jwt.header).toStrictEqual(JSON.parse(CredentialManifestMocks.Header));
            expect(credentialManifest?.jwt.payload).toStrictEqual(JSON.parse(CredentialManifestMocks.Payload));
            expect(credentialManifest?.jwt.signature).toBe(CredentialManifestMocks.Signature);
            expect(credentialManifest?.didJwk).toStrictEqual(DidJwkMocks.DidJwk);
            expect(credentialManifest?.remoteCryptoServicesToken?.value).toBe("some token");
        } catch (error) {
            console.log(error);
            expect(error).toBeNull();
        }
    });

    test("testGetCredentialManifestFailure", async () => {
        subject2 = new CredentialManifestUseCaseImpl(
            new CredentialManifestRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(`{"wrong": "payload"}`))
            ),
            new ResolveKidRepositoryImpl(
                new NetworkServiceSuccess(CredentialManifestMocks.JWK)
            ),
            new JwtServiceRepositoryImpl(
                new JwtSignServiceMock(''),
                new JwtVerifyServiceMock()
            ),
            new CredentialManifestByDeepLinkVerifierImpl()
        );

        try {
            await subject2.getCredentialManifest(
                new VCLCredentialManifestDescriptorByDeepLink(
                    DeepLinkMocks.CredentialManifestDeepLinkDevNet,
                    VCLIssuingType.Career,
                    null,
                    DidJwkMocks.DidJwk
                ),
                new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1))
            );
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error?.errorCode).toBe(VCLErrorCode.SdkError.toString());
        }
    });
});