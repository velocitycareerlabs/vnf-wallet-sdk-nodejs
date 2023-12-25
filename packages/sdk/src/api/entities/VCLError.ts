export default class VCLError extends Error {
    payload: Nullish<string> = null;
    error: Nullish<string> = null;
    errorCode: Nullish<string> = null;
    statusCode: Nullish<number> = null;

    constructor(
        error: Nullish<string> = null,
        errorCode: Nullish<string> = null,
        message: Nullish<string> = null,
        statusCode: Nullish<number> = null
    ) {
        super(message ?? "");
        this.error = error;
        this.errorCode = errorCode;
        this.statusCode = statusCode;

        this.name = "VCLError";
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }

    static fromPayload(payload: string): VCLError {
        const payloadJson = JSON.parse(payload);
        let result = new VCLError(
            payloadJson?.[VCLError.KeyError] || null,
            payloadJson?.[VCLError.KeyErrorCode] || null,
            payloadJson?.[VCLError.KeyMessage] || null,
            payloadJson?.[VCLError.KeyStatusCode] || null
        );
        result.payload = payload;

        return result;
    }

    static fromException(
        exception: Error,
        statusCode: number | null = null
    ): VCLError {
        let result = new VCLError(null, null, exception.message, statusCode);

        return result;
    }

    get jsonObject(): JSONObject {
        return {
            [VCLError.KeyPayload]: this.payload,
            [VCLError.KeyError]: this.error,
            [VCLError.KeyErrorCode]: this.errorCode,
            [VCLError.KeyMessage]: this.message,
            [VCLError.KeyStatusCode]: this.statusCode,
        };
    }

    static readonly KeyPayload: string = "payload";
    static readonly KeyError: string = "error";
    static readonly KeyErrorCode: string = "errorCode";
    static readonly KeyMessage: string = "message";
    static readonly KeyStatusCode: string = "statusCode";
}
