import NetworkServiceSuccess from "../NetworkServiceSuccess";
import VerifiedProfileUseCaseImpl from "../../src/impl/data/usecases/VerifiedProfileUseCaseImpl";
import VerifiedProfileRepositoryImpl from "../../src/impl/data/repositories/VerifiedProfileRepositoryImpl";
import { VerifiedProfileMocks } from "../infrastructure/resources/valid/VerifiedProfileMocks";
import { VCLVerifiedProfile, VCLVerifiedProfileDescriptor } from "../../src";
import { expect } from "@jest/globals";

describe("CredentialTypesUseCaseImpl Tests", () => {
    const subject1 = new VerifiedProfileUseCaseImpl(new VerifiedProfileRepositoryImpl(
        new NetworkServiceSuccess(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1))
    ))
    const subject2 = new VerifiedProfileUseCaseImpl(new VerifiedProfileRepositoryImpl(
        new NetworkServiceSuccess(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerInspectorJsonStr))
    ))
    const subject3 = new VerifiedProfileUseCaseImpl(new VerifiedProfileRepositoryImpl(
        new NetworkServiceSuccess(JSON.parse(VerifiedProfileMocks.VerifiedProfileNotaryIssuerJsonStr))
    ))
    const subject4 = new VerifiedProfileUseCaseImpl(new VerifiedProfileRepositoryImpl(
        new NetworkServiceSuccess(JSON.parse(VerifiedProfileMocks.VerifiedProfileNotaryIssuerJsonStr))
    ))

    test("testGetVerifiedProfileIssuerSuccess", async () => {
        const verifiedProfile = await subject1.getVerifiedProfile(new VCLVerifiedProfileDescriptor("did123"))
        compareVerifiedProfile(verifiedProfile)
    })

    test("testGetVerifiedProfileIssuerInspector1Success", async () => {
        const verifiedProfile = await subject2.getVerifiedProfile(new VCLVerifiedProfileDescriptor("did123"))
        compareVerifiedProfile(verifiedProfile)
    })

    test("testGetVerifiedProfileIssuerInspector2Success", async () => {
        const verifiedProfile = await subject3.getVerifiedProfile(new VCLVerifiedProfileDescriptor("did123"))
        compareVerifiedProfile(verifiedProfile)
    })

    test("testGetVerifiedProfileIssuerNotaryIssuer2Success", async () => {
        const verifiedProfile = await subject4.getVerifiedProfile(new VCLVerifiedProfileDescriptor("did123"))
        compareVerifiedProfile(verifiedProfile)
    })

    const compareVerifiedProfile = (verifiedProfile: VCLVerifiedProfile) => {
        expect(verifiedProfile.id).toBe(VerifiedProfileMocks.ExpectedId)
        expect(verifiedProfile.logo).toBe(VerifiedProfileMocks.ExpectedLogo)
        expect(verifiedProfile.name).toBe(VerifiedProfileMocks.ExpectedName)
    }
});