import VCLPresentationRequest from "../../../../src/api/entities/VCLPresentationRequest";
import VCLPushDelegate from "../../../../src/api/entities/VCLPushDelegate";
import { DeepLinkMocks } from "./DeepLinkMocks";
import { JwtServiceMocks } from "./JwtServiceMocks";
import VCLVerifiableCredential from "../../../../src/api/entities/VCLVerifiableCredential";
import VCLVerifiedProfile from "../../../../src/api/entities/VCLVerifiedProfile";

class PresentationSubmissionMocks {
    static PushDelegate = new VCLPushDelegate(
        "https://devservices.velocitycareerlabs.io/api/push-gateway",
        "if0123asd129smw321"
    );
    static PresentationSubmissionResultJson =
        '{"token":"u7yLD8KS2eTEqkg9aRQE","exchange":{"id":"64131231","type":"DISCLOSURE","disclosureComplete":true,"exchangeComplete":true}}';
    static PresentationRequest = new VCLPresentationRequest(
        JwtServiceMocks.JWT,
        new VCLVerifiedProfile(''),
        DeepLinkMocks.CredentialManifestDeepLinkMainNet,
        this.PushDelegate
    );

    static SelectionsList = [
        new VCLVerifiableCredential(
            "IdDocument",
            JwtServiceMocks.AdamSmithIdDocumentJwt
        ),
        new VCLVerifiableCredential("Email", JwtServiceMocks.AdamSmithEmailJwt),
    ];
}

export { PresentationSubmissionMocks };
