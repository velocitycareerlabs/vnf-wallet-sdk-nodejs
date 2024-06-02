import {
    VCLCredentialManifest,
    VCLDeepLink,
    VCLFinalizeOffersDescriptor,
    VCLJwt,
    VCLVerifiedProfile
} from "../../src";
import { CredentialManifestMocks } from "../infrastructure/resources/valid/CredentialManifestMocks";
import { DidJwkMocks } from "../infrastructure/resources/valid/DidJwkMocks";
import { beforeAll, expect } from "@jest/globals";
import { VerifiedProfileMocks } from "../infrastructure/resources/valid/VerifiedProfileMocks";

describe("VCLCredentialManifest Tests", () => {

    let subject: VCLFinalizeOffersDescriptor;

    const nonceMock = "some nonce"

    const approvedOfferIds = ["approvedOfferId1", "approvedOfferId2"]
    const rejectedOfferIds = ["rejectedOfferId1", "rejectedOfferId2"]

    beforeAll(async () => {
        const credentialManifest =
            new VCLCredentialManifest(
                VCLJwt.fromEncodedJwt(CredentialManifestMocks.JwtCredentialManifest1),
                null,
                new VCLVerifiedProfile(JSON.parse(VerifiedProfileMocks.VerifiedProfileIssuerJsonStr1)),
                new VCLDeepLink(''),
                DidJwkMocks.DidJwk
            )
        subject = new VCLFinalizeOffersDescriptor(
            credentialManifest,
            '',
            approvedOfferIds,
            rejectedOfferIds
        )
    });

    test("test generateRequest body", () => {
        const jwtProof = VCLJwt.fromEncodedJwt(
            'eyJraWQiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbEF0TWpVMklpd2lhMmxrSWpvaU56VXhOekZsWm1FdFkyTTRNaTAwWlRVeUxXSTFaVFl0WkRRMlpXRmhaamMzTkRneElpd2llQ0k2SW0xRldEbHliR2hJWVVaVmNreEtla0p4VWt4bmIySndNVmR4UzJSTmFEVndiVVp5UzJjME9WbEZkVUVpTENKNUlqb2lWakZPTVdKU1FrRXplalp2VGxrelZXdFFORUZsWVVGQk5rNUtiREl5TVRSVWFVSnFTRTlJYWpGdVVTSjkjMCIsInR5cCI6IkpXVCIsImFsZyI6IkVTMjU2IiwiandrIjp7Imt0eSI6IkVDIiwidXNlIjoic2lnIiwiY3J2IjoiUC0yNTYiLCJraWQiOiI3NTE3MWVmYS1jYzgyLTRlNTItYjVlNi1kNDZlYWFmNzc0ODEiLCJ4IjoibUVYOXJsaEhhRlVyTEp6QnFSTGdvYnAxV3FLZE1oNXBtRnJLZzQ5WUV1QSIsInkiOiJWMU4xYlJCQTN6Nm9OWTNVa1A0QWVhQUE2TkpsMjIxNFRpQmpIT0hqMW5RIn19.eyJrZXkxIjoidmFsdWUxIiwiYXVkIjoic29tZSBzdWQiLCJzdWIiOiJ3VzdCZGhXNGNQIiwibmJmIjoxNzE2OTAzNzIxLCJpc3MiOiJzb21lIGlzcyIsImV4cCI6MTcxNzUwODUyMSwiaWF0IjoxNzE2OTAzNzIxLCJub25jZSI6InNvbWUgbm9uY2UiLCJqdGkiOiJzb21lIGp0aSJ9'
        )
        const requestBody = subject.generateRequestBody(jwtProof)

        expect(requestBody["exchangeId"]).toBe("645e315309237c760ac022b1")
        expect(requestBody["approvedOfferIds"]).toStrictEqual(approvedOfferIds)
        expect(requestBody["rejectedOfferIds"]).toStrictEqual(rejectedOfferIds)
        const proof = requestBody["proof"]
        expect(proof["proof_type"]).toBe("jwt")
        expect(proof["jwt"]).toBe(jwtProof.encodedJwt)
//        equivalent to checking nonce in proof jwt
        expect(jwtProof.payload["nonce"]).toBe(nonceMock)
    });

});