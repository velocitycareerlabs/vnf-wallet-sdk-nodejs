export default class Response<T = any> {
    constructor(readonly payload: T, readonly code: number) {}
}
