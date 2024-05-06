import { Nullish } from "../../types";
import VCLJwt from "./VCLJwt";
import VCLPushDelegate from "./VCLPushDelegate";
import VCLVerifiableCredential from "./VCLVerifiableCredential";
import crypto from "crypto";

export default class VCLSubmission {
    constructor(
        public readonly submitUri: string,
        public readonly iss: string,
        public readonly exchangeId: string,
        public readonly presentationDefinitionId: string,
        public readonly verifiableCredentials: VCLVerifiableCredential[],
        public readonly pushDelegate: Nullish<VCLPushDelegate> = null,
        public readonly vendorOriginContext: Nullish<string> = null
    ) {}

    readonly jti = crypto.randomUUID().toString();
    readonly submissionId = crypto.randomUUID().toString();

    get payload() {
        return this.generatePayload();
    }
    public generatePayload(iss?: string) {
        const result: JSONObject = {
            [VCLSubmission.KeyJti]: this.jti,
            [VCLSubmission.KeyVp]: {
                [VCLSubmission.KeyType]:
                    VCLSubmission.ValueVerifiablePresentation,
                [VCLSubmission.KeyPresentationSubmission]: {
                    [VCLSubmission.KeyId]: this.submissionId,
                    [VCLSubmission.KeyDefinitionId]:
                        this.presentationDefinitionId,
                    [VCLSubmission.KeyDescriptorMap]:
                        this.verifiableCredentials.map((credential, index) => ({
                            [VCLSubmission.KeyId]: credential.inputDescriptor,
                            [VCLSubmission.KeyPath]: `$.verifiableCredential[${index}]`,
                            [VCLSubmission.KeyFormat]: VCLSubmission.ValueJwtVc,
                        })),
                },
                [VCLSubmission.KeyVerifiableCredential]:
                    this.verifiableCredentials.map((c) => c.jwtVc),
            },
        };
        if (this.vendorOriginContext) {
            result[VCLSubmission.KeyVp][VCLSubmission.KeyVendorOriginContext] =
                this.vendorOriginContext;
        }
        return result;
    }

    generateRequestBody(jwt: VCLJwt) {
        const result: JSONObject = {
            [VCLSubmission.KeyExchangeId]: this.exchangeId,
            [VCLSubmission.KeyJwtVp]: jwt.signedJwt.serialize(),
            [VCLSubmission.KeyContext]: VCLSubmission.ValueContextList,
        };

        if (this.pushDelegate) {
            result[VCLSubmission.KeyPushDelegate] =
                this.pushDelegate.toJsonObject();
        }

        return result;
    }

    static readonly KeyJti = "jti";
    static readonly KeyId = "id";
    static readonly KeyVp = "vp";
    static readonly KeyDid = "did";
    static readonly KeyPushDelegate = "push_delegate";
    static readonly KeyType = "type";
    static readonly KeyPresentationSubmission = "presentation_submission";
    static readonly KeyDefinitionId = "definition_id";
    static readonly KeyDescriptorMap = "descriptor_map";
    static readonly KeyExchangeId = "exchange_id";
    static readonly KeyJwtVp = "jwt_vp";
    static readonly KeyPath = "path";
    static readonly KeyFormat = "format";
    static readonly KeyVerifiableCredential = "verifiableCredential";
    static readonly KeyVendorOriginContext = "vendorOriginContext";
    static readonly KeyInputDescriptor = "input_descriptor";
    static readonly ValueJwtVc = "jwt_vc";
    static readonly ValueVerifiablePresentation = "VerifiablePresentation";
    static readonly KeyContext = "@context";

    static readonly ValueContextList = [
        "https://www.w3.org/2018/credentials/v1",
    ];
}
