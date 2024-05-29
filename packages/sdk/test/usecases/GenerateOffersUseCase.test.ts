import GenerateOffersUseCase from "../../src/impl/domain/usecases/GenerateOffersUseCase";
import GenerateOffersRepositoryImpl from "../../src/impl/data/repositories/GenerateOffersRepositoryImpl";
import GenerateOffersUseCaseImpl from "../../src/impl/data/usecases/GenerateOffersUseCaseImpl";
import NetworkServiceSuccess from "../NetworkServiceSuccess";
import { GenerateOffersMocks } from "../infrastructure/resources/valid/GenerateOffersMocks";
import { VCLCredentialManifest, VCLGenerateOffersDescriptor, VCLVerifiedProfile } from "../../src";
import { VerifiedProfileMocks } from "../infrastructure/resources/valid/VerifiedProfileMocks";
import { DidJwkMocks } from "../infrastructure/resources/valid/DidJwkMocks";
import { CommonMocks } from "../infrastructure/resources/CommonMocks";
import { expect } from "@jest/globals";
import { VCLOffer } from "../../src/api/entities/VCLOffer";

describe("GenerateOffersUseCase Tests", () => {
    let subject1: GenerateOffersUseCase
    let subject2: GenerateOffersUseCase
    let subject3: GenerateOffersUseCase

    const expectedOffer1 = new VCLOffer(JSON.parse(GenerateOffersMocks.Offer1));
    const expectedOffer2 = new VCLOffer(JSON.parse(GenerateOffersMocks.Offer2));

    test("testGenerateOffersJsonObj", async () => {
        subject1 = new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(GenerateOffersMocks.GeneratedOffersJsonObj)
            )
        )

        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            new VCLCredentialManifest(
                CommonMocks.JWT,
                null,
                new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1)),
                null,
                DidJwkMocks.DidJwk
            ),
            null,
            null,
            []
        )

        const generatedOffers = await subject1.generateOffers(generateOffersDescriptor, CommonMocks.Token);

        expect(generatedOffers?.payload).toStrictEqual(GenerateOffersMocks.GeneratedOffersJsonObj);
        expect(generatedOffers?.all[0]).toStrictEqual(expectedOffer1);
        expect(generatedOffers?.all[1]).toStrictEqual(expectedOffer2);
        expect(generatedOffers?.challenge).toBe(GenerateOffersMocks.Challenge);
        expect(generatedOffers?.token).toStrictEqual(CommonMocks.Token);
    });

    test("testGenerateOffersJsonArr", async () => {
        subject1 = new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(GenerateOffersMocks.GeneratedOffersJsonArr)
            )
        )

        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            new VCLCredentialManifest(
                CommonMocks.JWT,
                null,
                new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1)),
                null,
                DidJwkMocks.DidJwk
            ),
            null,
            null,
            []
        )

        const generatedOffers = await subject1.generateOffers(generateOffersDescriptor, CommonMocks.Token);

        expect(generatedOffers?.payload).toStrictEqual(GenerateOffersMocks.GeneratedOffersJsonArr);
        expect(generatedOffers?.all[0]).toStrictEqual(expectedOffer1);
        expect(generatedOffers?.all[1]).toStrictEqual(expectedOffer2);
        expect(generatedOffers?.challenge).toBeNull()
        expect(generatedOffers?.token).toStrictEqual(CommonMocks.Token);
    });

    test("testGenerateOffersEmptyJsonObj", async () => {
        subject2 = new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(GenerateOffersMocks.GeneratedOffersEmptyJsonObj)
            )
        )

        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            new VCLCredentialManifest(
                CommonMocks.JWT,
                null,
                new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1)),
                null,
                DidJwkMocks.DidJwk
            ),
            null,
            null,
            []
        )

        const generatedOffers = await subject2.generateOffers(generateOffersDescriptor, CommonMocks.Token);

        expect(generatedOffers?.payload).toStrictEqual({});
        expect(generatedOffers?.all).toStrictEqual([]);
        expect(generatedOffers?.challenge).toBeNull();
        expect(generatedOffers?.token).toStrictEqual(CommonMocks.Token);
    });

    test("testGenerateOffersEmptyJsonArr", async () => {
        subject3 = new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(GenerateOffersMocks.GeneratedOffersEmptyJsonArr)
            )
        )

        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            new VCLCredentialManifest(
                CommonMocks.JWT,
                null,
                new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1)),
                null,
                DidJwkMocks.DidJwk
            ),
            null,
            null,
            []
        )

        const generatedOffers = await subject3.generateOffers(generateOffersDescriptor, CommonMocks.Token);

        expect(generatedOffers?.payload).toStrictEqual([]);
        expect(generatedOffers?.all).toStrictEqual([]);
        expect(generatedOffers?.challenge).toBeNull();
        expect(generatedOffers?.token).toStrictEqual(CommonMocks.Token);
    });
});