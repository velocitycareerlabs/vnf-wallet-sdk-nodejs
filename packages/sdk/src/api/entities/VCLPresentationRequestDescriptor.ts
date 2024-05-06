import { Nullish } from "../../types";
import VCLDeepLink from "./VCLDeepLink";
import VCLPushDelegate from "./VCLPushDelegate";

export default class VCLPresentationRequestDescriptor {
    constructor(
        public readonly deepLink: VCLDeepLink,
        public readonly pushDelegate: Nullish<VCLPushDelegate> = null
    ) {}

    get endpoint() {
        const queryParams = this.generateQueryParams();
        if (queryParams) {
            return this.deepLink.requestUri?.appendQueryParams(queryParams);
        }
        return this.deepLink.requestUri;
    }

    get did() {
        return this.deepLink.did;
    }

    generateQueryParams() {
        let pPushDelegate: Nullish<string>;
        if (this.pushDelegate) {
            pPushDelegate = `${
                VCLPresentationRequestDescriptor.KeyPushDelegatePushUrl
            }=${encodeURIComponent(this.pushDelegate.pushUrl)}&${
                VCLPresentationRequestDescriptor.KeyPushDelegatePushToken
            }=${this.pushDelegate.pushToken}`;
        }

        const qParams = [pPushDelegate].filter((it) => it && it.length);
        return qParams.length ? qParams.join("&") : null;
    }

    static readonly KeyId = "id";
    static readonly KeyPushDelegatePushUrl = "push_delegate.push_url";
    static readonly KeyPushDelegatePushToken = "push_delegate.push_token";
}
