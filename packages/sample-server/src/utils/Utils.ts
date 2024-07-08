/**
 * Created by Michael Avoyan on 30/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { randomBytes } from "crypto";

export const getQueryParameters = (urlStr: string): Map<string, string> => {
    const result = new Map<string, string>();

    try {
        const url = new URL(urlStr.valueOf());
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        for (const i of url.searchParams.entries()) {
            const [key, value] = i;
            // each 'entry' is a [key, value] tuple
            result.set(key, value);
        }
    } catch (error: any) {
        error.printStackTrace();
    }

    return result;
};

export const appendQueryParams = (urlStr: string, queryParams: string): string => {
    return (
        urlStr.valueOf() +
        (getQueryParameters((decodeURI(urlStr.valueOf()))).size ? "&" : "?") +
        queryParams
    );
};

export const getUrlSubPath = (urlStr: string, subPathPrefix: string): string | null | undefined => {
    return decodeURI(urlStr.valueOf())
        .split("/")
        .find((item) => item.startsWith(subPathPrefix));
};

export const randomString = (length: number): string => {
    return randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
};
