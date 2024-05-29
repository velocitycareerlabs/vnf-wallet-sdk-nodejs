import PresentationRequestUseCaseImpl from "../../src/impl/data/usecases/PresentationRequestUseCaseImpl";
import PresentationRequestRepositoryImpl from "../../src/impl/data/repositories/PresentationRequestRepositoryImpl";
import NetworkServiceSuccess from "../NetworkServiceSuccess";
import { PresentationRequestMocks } from "../infrastructure/resources/valid/PresentationRequestMocks";
import ResolveKidRepositoryImpl from "../../src/impl/data/repositories/ResolveKidRepositoryImpl";
import JwtServiceRepositoryImpl from "../../src/impl/data/repositories/JwtServiceRepositoryImpl";
import { JwtSignServiceMock } from "../infrastructure/resources/jwt/JwtSignServiceMock";
import { JwtVerifyServiceMock } from "../infrastructure/resources/jwt/JwtVerifyServiceMock";
import {
    VCLErrorCode,
    VCLPresentationRequestDescriptor,
    VCLPushDelegate,
    VCLToken,
    VCLVerifiedProfile
} from "../../src";
import { DeepLinkMocks } from "../infrastructure/resources/valid/DeepLinkMocks";
import { DidJwkMocks } from "../infrastructure/resources/valid/DidJwkMocks";
import PresentationRequestUseCase from "../../src/impl/domain/usecases/PresentationRequestUseCase";

describe("PresentationRequestUseCase Tests", () => {
    let subject1: PresentationRequestUseCase
    let subject2: PresentationRequestUseCase

    test("testGetPresentationRequestSuccess", async () => {
        const pushUrl = "push_url"
        const pushToken = "push_token"
        subject1 = new PresentationRequestUseCaseImpl(
            new PresentationRequestRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(PresentationRequestMocks.EncodedPresentationRequestResponse))
            ),
            new ResolveKidRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(PresentationRequestMocks.JWK))
            ),
            new JwtServiceRepositoryImpl(
                new JwtSignServiceMock(''),
                new JwtVerifyServiceMock()
            )
        )

        const presentationRequest = await subject1.getPresentationRequest(
            new VCLPresentationRequestDescriptor(
                DeepLinkMocks.PresentationRequestDeepLinkDevNet,
                new VCLPushDelegate(
                    pushUrl,
                    pushToken
                ),
                DidJwkMocks.DidJwk,
                new VCLToken("some token")
            ),
            new VCLVerifiedProfile({})
        );
        expect(presentationRequest.jwt).toStrictEqual(PresentationRequestMocks.PresentationRequestJwt);
        expect(presentationRequest.pushDelegate?.pushUrl).toBe(pushUrl);
        expect(presentationRequest.pushDelegate?.pushToken).toBe(pushToken);
        expect(presentationRequest.didJwk).toStrictEqual(DidJwkMocks.DidJwk);
        expect(presentationRequest.remoteCryptoServicesToken?.value).toBe('some token');

    });

    test("testGetPresentationRequestSuccess", async () => {
        const pushUrl = "push_url"
        const pushToken = "push_token"
        subject2 = new PresentationRequestUseCaseImpl(
            new PresentationRequestRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(`{"wrong": "payload"}`))
            ),
            new ResolveKidRepositoryImpl(
                new NetworkServiceSuccess(JSON.parse(PresentationRequestMocks.JWK))
            ),
            new JwtServiceRepositoryImpl(
                new JwtSignServiceMock(''),
                new JwtVerifyServiceMock()
            )
        )
        try {
            // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
            const presentationRequest = await subject2.getPresentationRequest(
                new VCLPresentationRequestDescriptor(
                    DeepLinkMocks.PresentationRequestDeepLinkDevNet,
                    new VCLPushDelegate(
                        pushUrl,
                        pushToken
                    ),
                    DidJwkMocks.DidJwk,
                    new VCLToken("some token")
                ),
                new VCLVerifiedProfile({})
            );
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.errorCode).toBe(VCLErrorCode.SdkError.toString());
        }
    });
});