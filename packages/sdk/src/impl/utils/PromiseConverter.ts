export default class PromiseConverter {
    static MethodToPromise<T>(
        method: (
            successHandler: (a: T) => any,
            errorHandler: (e: any) => any
        ) => any
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            method(resolve, reject);
        });
    }
}
