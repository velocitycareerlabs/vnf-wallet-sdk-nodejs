type Nullish<T> = T | null | undefined;

type JSONObject = any;

interface String {
    getQueryParameters(): Map<string, string>;
    appendQueryParams(queryParams: string): string;
    getUrlSubPath(subPathPrefix: string): Nullish<string>;
    randomString(length: number): string;
}

interface Array<T> {
    toJsonArray(): any[];
}

interface Date {
    addDaysToNow(days: number): Date;
    equalsTo(date: Date): Boolean;
}
