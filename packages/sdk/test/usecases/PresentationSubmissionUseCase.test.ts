import PresentationRequestUseCaseImpl from "../../src/impl/data/usecases/PresentationRequestUseCaseImpl";
import PresentationRequestRepositoryImpl from "../../src/impl/data/repositories/PresentationRequestRepositoryImpl";
import NetworkServiceSuccess from "../NetworkServiceSuccess";
import { PresentationRequestMocks } from "../infrastructure/resources/valid/PresentationRequestMocks";
import ResolveKidRepositoryImpl from "../../src/impl/data/repositories/ResolveKidRepositoryImpl";
import JwtServiceRepositoryImpl from "../../src/impl/data/repositories/JwtServiceRepositoryImpl";
import { JwtSignServiceMock } from "../infrastructure/resources/jwt/JwtSignServiceMock";
import { JwtVerifyServiceMock } from "../infrastructure/resources/jwt/JwtVerifyServiceMock";
import {
    Dictionary,
    VCLDeepLink,
    VCLErrorCode, VCLExchange, VCLPresentationRequest,
    VCLPresentationRequestDescriptor, VCLPresentationSubmission,
    VCLPushDelegate, VCLSubmissionResult,
    VCLToken,
    VCLVerifiedProfile
} from "../../src";
import { DeepLinkMocks } from "../infrastructure/resources/valid/DeepLinkMocks";
import { DidJwkMocks } from "../infrastructure/resources/valid/DidJwkMocks";
import PresentationSubmissionUseCase from "../../src/impl/domain/usecases/PresentationSubmissionUseCase";
import { beforeAll, expect } from "@jest/globals";
import PresentationSubmissionUseCaseImpl from "../../src/impl/data/usecases/PresentationSubmissionUseCaseImpl";
import { PresentationSubmissionMocks } from "../infrastructure/resources/valid/PresentationSubmissionMocks";
import SubmissionRepositoryImpl from "../../src/impl/data/repositories/SubmissionRepositoryImpl";
import { CommonMocks } from "../infrastructure/resources/CommonMocks";

describe("PresentationSubmission Tests", () => {
    const subject = new PresentationSubmissionUseCaseImpl(
        new SubmissionRepositoryImpl(
            new NetworkServiceSuccess(PresentationSubmissionMocks.PresentationSubmissionResultJson)
        ),
        new JwtServiceRepositoryImpl(
            new JwtSignServiceMock(PresentationSubmissionMocks.JwtEncodedSubmission),
            new JwtVerifyServiceMock()
        )

    )
    const didJwk = DidJwkMocks.DidJwk
    const presentationSubmission = new VCLPresentationSubmission(
        new VCLPresentationRequest(
            CommonMocks.JWT,
            new VCLVerifiedProfile({}),
            new VCLDeepLink(""),
            null,
            didJwk
        ),
        [],
    )
    const expectedExchange = (exchangeJsonObj: Dictionary<any>): VCLExchange => {
        return new VCLExchange(
            exchangeJsonObj[VCLExchange.KeyId],
            exchangeJsonObj[VCLExchange.KeyType],
            exchangeJsonObj[VCLExchange.KeyDisclosureComplete],
            exchangeJsonObj[VCLExchange.KeyExchangeComplete]
        );
    }
    const generatePresentationSubmissionResult = (
        jsonObj: Dictionary<any>,
        jti: string,
        submissionId: string
    ): VCLSubmissionResult => {
        const exchangeJsonObj = jsonObj[VCLSubmissionResult.KeyExchange];
        return new VCLSubmissionResult(
            new VCLToken(jsonObj[VCLSubmissionResult.KeyToken]),
            expectedExchange(exchangeJsonObj),
            jti,
            submissionId
        );
    }
    const expectedPresentationSubmissionResult =
        generatePresentationSubmissionResult(
            PresentationSubmissionMocks.PresentationSubmissionResultJson,
            presentationSubmission.jti,
            presentationSubmission.submissionId
        )
    test("testGetPresentationSubmissionSuccess", async () => {
        const result = await subject.submit(presentationSubmission)
        const [error, presentationSubmissionResult] = result.handleResult()

        expect(presentationSubmissionResult?.sessionToken.value).toBe(expectedPresentationSubmissionResult.sessionToken.value)
        expect(presentationSubmissionResult?.exchange.id).toBe(expectedPresentationSubmissionResult.exchange.id)
        expect(presentationSubmissionResult?.jti).toBe(expectedPresentationSubmissionResult.jti)
        expect(presentationSubmissionResult?.submissionId).toBe(expectedPresentationSubmissionResult.submissionId)
        expect(error).toBeNull()
    });
});