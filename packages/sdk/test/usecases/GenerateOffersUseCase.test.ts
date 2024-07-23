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
import { OffersByDeepLinkVerifierImpl } from "../../src/impl/data/verifiers";

describe('GenerateOffersUseCaseTest', () => {
    let subject1: GenerateOffersUseCase;
    let subject2: GenerateOffersUseCase;
    let subject3: GenerateOffersUseCase;

    const verifiedProfile = new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1));

    it('testGenerateOffers', async () => {
        subject1 = new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(GenerateOffersMocks.GeneratedOffers))
            ),
            new OffersByDeepLinkVerifierImpl()
        );

        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            new VCLCredentialManifest(
                CommonMocks.JWT,
                null,
                verifiedProfile,
                null,
                DidJwkMocks.DidJwk,
                null
            ),
            null,
            null,
            []
        );

        const offers = await subject1.generateOffers(generateOffersDescriptor, CommonMocks.Token)
        expect(offers.all.map(offer => offer.payload)).toStrictEqual(JSON.parse(GenerateOffersMocks.Offers));
        expect(offers.challenge).toBe(GenerateOffersMocks.Challenge);
        expect(offers?.sessionToken).toStrictEqual(CommonMocks.Token);
    });

    it('testGenerateOffersEmptyJsonObj', async () => {
        subject2 = new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(GenerateOffersMocks.GeneratedOffersEmptyJsonObj))
            ),
            new OffersByDeepLinkVerifierImpl(),
        );

        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            new VCLCredentialManifest(
                CommonMocks.JWT,
                null,
                verifiedProfile,
                null,
                DidJwkMocks.DidJwk
            ),
            null,
            null,
            []
        );

        const offers = await subject2.generateOffers(generateOffersDescriptor, CommonMocks.Token)
        expect(offers.all).toEqual([]);
        expect(offers.challenge).toBeNull();
        expect(offers?.sessionToken).toStrictEqual(CommonMocks.Token);
    });

    it('testGenerateOffersEmptyJsonArr', async () => {
        subject3 = new GenerateOffersUseCaseImpl(
            new GenerateOffersRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(GenerateOffersMocks.GeneratedOffersEmptyJsonArr))
            ),
            new OffersByDeepLinkVerifierImpl(),
        );

        const generateOffersDescriptor = new VCLGenerateOffersDescriptor(
            new VCLCredentialManifest(
                CommonMocks.JWT,
                null,
                verifiedProfile,
                null,
                DidJwkMocks.DidJwk,
                null
            ),
            null,
            null,
            []
        );

        const offers = await subject3.generateOffers(generateOffersDescriptor, CommonMocks.Token)
        expect(offers.all).toEqual([]);
        expect(offers.challenge).toBeNull();
        expect(offers?.sessionToken).toStrictEqual(CommonMocks.Token);
    });
});
