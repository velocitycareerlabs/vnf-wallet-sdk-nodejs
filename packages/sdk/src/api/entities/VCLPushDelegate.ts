export default class VCLPushDelegate {
    constructor(
        public readonly pushUrl: string,
        public readonly pushToken: string
    ) {}

    static readonly KeyPushUrl = "pushUrl";
    static readonly KeyPushToken = "pushToken";

    toJsonObject() {
        return {
            [VCLPushDelegate.KeyPushUrl]: this.pushUrl,
            [VCLPushDelegate.KeyPushToken]: this.pushToken,
        };
    }
}
