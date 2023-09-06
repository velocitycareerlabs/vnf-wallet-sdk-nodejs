import { randomBytes } from "crypto";

String.prototype.getQueryParameters = function (): Map<string, string> {
    const result = new Map<string, string>();

    try {
        const url = new URL(this.valueOf());
        const entries = url.searchParams.entries();

        for (let i of entries) {
            const [key, value] = i;
            // each 'entry' is a [key, value] tupple
            result.set(key, value);
        }
    } catch (error) {}

    return result;
};

String.prototype.appendQueryParams = function (queryParams: string): string {
    return (
        this.valueOf() +
        (decodeURI(this.valueOf()).getQueryParameters().size ? "&" : "?") +
        queryParams
    );
};

String.prototype.getUrlSubPath = function (
    subPathPrefix: string
): Nullish<string> {
    return decodeURI(this.valueOf())
        .split("/")
        .find((item) => item.startsWith(subPathPrefix));
};

String.prototype.randomString = function (length: number): string {
    return randomBytes(length).toString("hex");
};
export {};
