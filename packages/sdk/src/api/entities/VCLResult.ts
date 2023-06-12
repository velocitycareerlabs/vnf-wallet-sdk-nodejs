import VCLError from "./VCLError";

export default class VCLResult<R> {
    static Success = class<T> extends VCLResult<T> {
        constructor(public data: T) {
            super();
        }

        handleResult(
            successHandler: (d: T) => any,
            errorHandler: (error: VCLError) => any
        ): void {
            successHandler(this.data);
        }

        getData(): Nullish<T> {
            return this.data;
        }
    };

    static Error = class<T> extends VCLResult<never> {
        constructor(public error: VCLError) {
            super();
        }
        handleResult(
            successHandler: (d: never) => any,
            errorHandler: (error: VCLError) => any
        ): void {
            errorHandler(this.error);
        }
    };

    handleResult(
        successHandler: (d: R) => any,
        errorHandler: (error: VCLError) => any
    ) {}

    getData(): Nullish<R> {
        return undefined;
    }
}
