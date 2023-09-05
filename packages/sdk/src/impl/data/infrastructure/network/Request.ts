export enum HttpMethod {
    GET = "GET",
    POST = "POST",
}

export default class Request {
    constructor(
        readonly endpoint: string,
        readonly method: HttpMethod,
        readonly body: Nullish<any> = null,
        readonly headers: { [key: string]: string } = {},
        readonly useCaches: Boolean = true,
        readonly contentType: Nullish<string> = null
    ) {}

    static readonly ContentTypeApplicationJson = "application/json";
}
