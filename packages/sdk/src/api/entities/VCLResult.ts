import { Nullish } from "../../types";
import VCLError from "./error/VCLError";

export default class VCLResult<R> {
    static Success = class<T> extends VCLResult<T> {
        constructor(public data: T) {
            super();
        }

        handleResult(): [Nullish<VCLError>, Nullish<T>] {
            return [null, this.data];
        }

        getData(): Nullish<T> {
            return this.data;
        }
    };

    static Error = class<T> extends VCLResult<T> {
        constructor(public error: VCLError) {
            super();
        }
        handleResult(): [Nullish<VCLError>, Nullish<T>] {
            return [this.error, null];
        }
    };

    handleResult(): [Nullish<VCLError>, Nullish<R>] {
        return [null, null];
    }

    getData(): Nullish<R> {
        return undefined;
    }
}
