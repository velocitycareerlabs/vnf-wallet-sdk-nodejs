import VCLError from "./error/VCLError";

export default class VCLResult<R> {
    static Success = class<T> extends VCLResult<T> {
        constructor(public data: T) {
            super();
        }

        handleResult(): [VCLError | null | undefined, T | null | undefined] {
            return [null, this.data];
        }

        getData(): T | null | undefined {
            return this.data;
        }
    };

    static Error = class<T> extends VCLResult<T> {
        constructor(public error: VCLError) {
            super();
        }
        handleResult(): [VCLError | null | undefined, T | null | undefined] {
            return [this.error, null];
        }
    };

    handleResult(): [VCLError | null | undefined, R | null | undefined] {
        return [null, null];
    }

    getData(): R | null | undefined {
        return undefined;
    }
}
