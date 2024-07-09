import { Dictionary, Nullish } from "../../VCLTypes";
import VCLErrorCode from "./VCLErrorCode";
import VCLStatusCode from "./VCLStatusCode";

export default class VCLError extends Error {
    payload: Nullish<string> = null;
    error: Nullish<string> = null;
    errorCode: string = VCLErrorCode.SdkError.toString();
    statusCode: Nullish<VCLStatusCode> = null;

    constructor(
        error: Nullish<string> = null,
        errorCode: string = VCLErrorCode.SdkError.toString(),
        message: Nullish<string> = null,
        statusCode: Nullish<VCLStatusCode> = null
    ) {
        super(message ?? "");
        this.error = error;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.payload = JSON.stringify(this.generatePayload());

        this.name = "VCLError";
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }

    static fromPayload(payload: string): VCLError {
        const payloadJson = JSON.parse(payload);
        const result = new VCLError(
            payloadJson?.[VCLError.KeyError] || null,
            payloadJson?.[VCLError.KeyErrorCode] || VCLErrorCode.SdkError.toString(),
            payloadJson?.[VCLError.KeyMessage] || null,
            payloadJson?.[VCLError.KeyStatusCode] || null
        );
        result.payload = payload;

        return result;
    }

    static fromError(
        error: any,
        statusCode: number | null = null
    ): VCLError {
        if (error instanceof VCLError) {
            return error;
        }
        return new VCLError(
            error.error,
            error.errorCode,
            error.message,
            error.statusCode ?? statusCode,
        );
    }

    get jsonObject(): Dictionary<any> {
        return {
            [VCLError.KeyPayload]: this.payload,
            [VCLError.KeyError]: this.error,
            [VCLError.KeyErrorCode]: (this.errorCode || VCLErrorCode.SdkError.toString()),
            [VCLError.KeyMessage]: this.message,
            [VCLError.KeyStatusCode]: this.statusCode,
        };
    }

    private generatePayload(): Dictionary<any> {
        return {
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
