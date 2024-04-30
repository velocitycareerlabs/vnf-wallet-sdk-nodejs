export enum HttpMethod {
    GET = "GET",
    POST = "POST",
}

export default class Request {
    constructor(
        readonly endpoint: string,
        readonly method: HttpMethod,
        readonly body: any | null | undefined = null,
        readonly headers: { [key: string]: string } = {},
        readonly useCaches: boolean = true,
        readonly contentType: string | null | undefined = null
    ) {}

    static readonly ContentTypeApplicationJson = "application/json";
}
