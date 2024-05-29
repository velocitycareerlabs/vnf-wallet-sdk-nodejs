// eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
interface String {
    getQueryParameters(): Map<string, string>;
    appendQueryParams(queryParams: string): string;
    getUrlSubPath(subPathPrefix: string): string | null | undefined;
    randomString(length: number): string;
}

// eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
interface Array<T> {
    toJsonArray(): any[];
}

// eslint-disable-next-line unused-imports/no-unused-vars
interface Date {
    addDaysToNow(days: number): Date;
    equalsTo(date: Date): boolean;
}