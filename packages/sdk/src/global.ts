declare type JSONObject = any;

interface String {
    getQueryParameters(): Map<string, string>;
    appendQueryParams(queryParams: string): string;
    getUrlSubPath(subPathPrefix: string): string | null | undefined;
    randomString(length: number): string;
}

interface Array<T> {
    toJsonArray(): any[];
}

interface Date {
    addDaysToNow(days: number): Date;
    equalsTo(date: Date): boolean;
}