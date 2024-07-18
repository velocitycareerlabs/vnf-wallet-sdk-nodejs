import NetworkServiceSuccess from "../NetworkServiceSuccess";
import { GenerateOffersMocks } from "../infrastructure/resources/valid/GenerateOffersMocks";
import FinalizeOffersUseCase from "../../src/impl/domain/usecases/FinalizeOffersUseCase";
import { beforeAll, expect } from "@jest/globals";
import {
    VCLCredentialManifest,
    VCLDeepLink, VCLFinalizeOffersDescriptor,
    VCLGenerateOffersDescriptor, VCLJwt, VCLOffers,
    VCLToken,
    VCLVerifiedProfile
} from "../../src";
import { VerifiedProfileMocks } from "../infrastructure/resources/valid/VerifiedProfileMocks";
import { DidJwkMocks } from "../infrastructure/resources/valid/DidJwkMocks";
import GenerateOffersUseCaseImpl from "../../src/impl/data/usecases/GenerateOffersUseCaseImpl";
import GenerateOffersRepositoryImpl from "../../src/impl/data/repositories/GenerateOffersRepositoryImpl";
import FinalizeOffersUseCaseImpl from "../../src/impl/data/usecases/FinalizeOffersUseCaseImpl";
import { JwtSignServiceMock } from "../infrastructure/resources/jwt/JwtSignServiceMock";
import { JwtVerifyServiceMock } from "../infrastructure/resources/jwt/JwtVerifyServiceMock";
import JwtServiceRepositoryImpl from "../../src/impl/data/repositories/JwtServiceRepositoryImpl";
import { FinalizeOffersRepositoryImpl } from "../../src/impl/data/repositories/FinalizeOffersRepositoryImpl";
import { CredentialMocks } from "../infrastructure/resources/valid/CredentialMocks";
import { CredentialManifestMocks } from "../infrastructure/resources/valid/CredentialManifestMocks";
import CredentialIssuerVerifierImpl from "../../src/impl/data/verifiers/CredentialIssuerVerifierImpl";
import CredentialDidVerifierImpl from "../../src/impl/data/verifiers/CredentialDidVerifierImpl";
import CredentialsByDeepLinkVerifierImpl from "../../src/impl/data/verifiers/CredentialsByDeepLinkVerifierImpl";
import OffersByDeepLinkVerifierImpl from "../../src/impl/data/verifiers/OffersByDeepLinkVerifierImpl";
import { JsonLdMocks } from "../infrastructure/resources/valid/JsonLdMocks";

describe("FinalizeOffersUseCase Tests", () => {
    let subject1: FinalizeOffersUseCase
    let subject2: FinalizeOffersUseCase

    const jwtSignServiceMock = new JwtSignServiceMock();
    const jwtVerifyServiceMock = new JwtVerifyServiceMock();
    const jwtServiceRepository = new JwtServiceRepositoryImpl(
        jwtSignServiceMock,
        jwtVerifyServiceMock
    );

    const vclJwtPassed = VCLJwt.fromEncodedJwt(CredentialManifestMocks.JwtCredentialManifestFromRegularIssuer)
    const credentialManifestPassed = new VCLCredentialManifest(
        vclJwtPassed,
        null,
        new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr2)),
        new VCLDeepLink(''),
        DidJwkMocks.DidJwk,
        null
    )
    const credentialsAmount = JSON.parse(CredentialMocks.JwtCredentialsFromRegularIssuer).length
    let offers: VCLOffers

    beforeAll(async () => {
        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            credentialManifestPassed,
            null,
            null,
            [],
        )
        offers = await new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(GenerateOffersMocks.GeneratedOffersJsonObj)
            ),
            new OffersByDeepLinkVerifierImpl()
        ).generateOffers(generateOffersDescriptor, new VCLToken(''))
        expect(offers.payload).toStrictEqual(GenerateOffersMocks.GeneratedOffersJsonObj);
        expect(offers.all[0].payload).toStrictEqual(JSON.parse(GenerateOffersMocks.Offer1));
        expect(offers.all[1].payload).toStrictEqual(JSON.parse(GenerateOffersMocks.Offer2));
        expect(offers.challenge == GenerateOffersMocks.Challenge)
    });

    test("testFinalizeOffersSuccess", async () => {
        subject1 = new FinalizeOffersUseCaseImpl(
            new FinalizeOffersRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(CredentialMocks.JwtCredentialsFromRegularIssuer))
            ),
            jwtServiceRepository,
            new CredentialIssuerVerifierImpl(
                new NetworkServiceSuccess(JsonLdMocks.Layer1v10Jsonld),
            ),
            new CredentialDidVerifierImpl(),
            new CredentialsByDeepLinkVerifierImpl()
        )

        const verifiableCredentials = await subject1.finalizeOffers(
            new VCLFinalizeOffersDescriptor(credentialManifestPassed, '', [], []),
            new VCLToken('')
        );

        expect(verifiableCredentials.passedCredentials.length).toBe(credentialsAmount);
        expect(verifiableCredentials.passedCredentials[0].encodedJwt)
            .toBe(CredentialMocks.JwtCredentialEducationDegreeRegistrationFromRegularIssuer);
        expect(verifiableCredentials.passedCredentials[1].encodedJwt)
            .toBe(CredentialMocks.JwtCredentialEmploymentPastFromRegularIssuer);
        expect(verifiableCredentials.failedCredentials.length).toBe(0);
    });

    test("testEmptyCredentials", async () => {
        subject2 = new FinalizeOffersUseCaseImpl(
            new FinalizeOffersRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(CredentialMocks.JwtEmptyCredentials))
            ),
            jwtServiceRepository,
            new CredentialIssuerVerifierImpl(
                new NetworkServiceSuccess(JsonLdMocks.Layer1v10Jsonld),
            ),
            new CredentialDidVerifierImpl(),
            new CredentialsByDeepLinkVerifierImpl()
        )

        const verifiableCredentials = await subject2.finalizeOffers(
            new VCLFinalizeOffersDescriptor(credentialManifestPassed, '', [], []),
            new VCLToken('')
        );

        expect(verifiableCredentials.passedCredentials.length).toBe(0);
        expect(verifiableCredentials.failedCredentials.length).toBe(0);
    });
});