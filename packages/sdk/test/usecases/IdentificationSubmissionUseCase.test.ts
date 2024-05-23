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
import IdentificationSubmissionUseCaseImpl from "../../src/impl/data/usecases/IdentificationSubmissionUseCaseImpl";
import VCLIdentificationSubmission from "../../src/api/entities/VCLIdentificationSubmission";
import { IdentificationSubmissionMocks } from "../infrastructure/resources/valid/IdentificationSubmissionMocks";
import VCLResult from "../../src/api/entities/VCLResult";
import VCLJwt from "../../src/api/entities/VCLJwt";
import VCLJwtDescriptor from "../../src/api/entities/VCLJwtDescriptor";

describe("PresentationSubmission Tests", () => {
    const jwtSignServiceMock = new JwtSignServiceMock();
    jwtSignServiceMock.sign = jest.fn().mockResolvedValue(
        Promise.resolve(new VCLResult.Success(VCLJwt.fromEncodedJwt(PresentationSubmissionMocks.JwtEncodedSubmission)))
    );
    const jwtVerifyServiceMock = new JwtVerifyServiceMock();
    const jwtServiceRepository = new JwtServiceRepositoryImpl(
        jwtSignServiceMock,
        jwtVerifyServiceMock
    );
    const submissionRepository = new SubmissionRepositoryImpl(
        new NetworkServiceSuccess(PresentationSubmissionMocks.PresentationSubmissionResultJson)
    );
    const subject = new IdentificationSubmissionUseCaseImpl(
        submissionRepository,
        jwtServiceRepository
    );
    const identificationSubmission = new VCLIdentificationSubmission(
        IdentificationSubmissionMocks.CredentialManifest,
        IdentificationSubmissionMocks.IdentificationList
    );

    const expectedExchange = (exchangeJsonObj: Dictionary<any>): VCLExchange => {
        return new VCLExchange(
            exchangeJsonObj[VCLExchange.KeyId],
            exchangeJsonObj[VCLExchange.KeyType],
            exchangeJsonObj[VCLExchange.KeyDisclosureComplete],
            exchangeJsonObj[VCLExchange.KeyExchangeComplete]
        );
    }
    const generateIdentificationSubmissionResult = (
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
        generateIdentificationSubmissionResult(
            PresentationSubmissionMocks.PresentationSubmissionResultJson,
            identificationSubmission.jti,
            identificationSubmission.submissionId
        )
    const identificationSubmissionPayload = identificationSubmission.generatePayload()

    test("testIdentificationSubmissionDidJwk", async () => {
        expect(IdentificationSubmissionMocks.CredentialManifest.didJwk).toStrictEqual(IdentificationSubmissionMocks.DidJwk)
        expect(identificationSubmission.didJwk).toStrictEqual(IdentificationSubmissionMocks.DidJwk)
    });

    test("testIdentificationSubmissionSuccess", async () => {
        const result = await subject.submit(identificationSubmission)
        const [error, identificationSubmissionResult] = result.handleResult()

        expect(jwtSignServiceMock.sign).toHaveBeenCalledTimes(1)
        expect(jwtSignServiceMock.sign).toHaveBeenCalledWith(
            new VCLJwtDescriptor(
                identificationSubmissionPayload,
                identificationSubmission.iss,
                identificationSubmission.jti,
                identificationSubmission.didJwk?.keyId
            ),
            identificationSubmission.didJwk,
            null,
            identificationSubmission.remoteCryptoServicesToken
        )

        expect(identificationSubmissionResult?.sessionToken.value).toBe(expectedPresentationSubmissionResult.sessionToken.value)
        expect(identificationSubmissionResult?.exchange.id).toBe(expectedPresentationSubmissionResult.exchange.id)
        expect(identificationSubmissionResult?.jti).toBe(expectedPresentationSubmissionResult.jti)
        expect(identificationSubmissionResult?.submissionId).toBe(expectedPresentationSubmissionResult.submissionId)
        expect(error).toBeNull()
    });
});