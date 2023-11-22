// export function isEquivalentUris(url1: string, url2: string): boolean {
//     const sortedUrl1 = url1.split('').sort().join('');
//     const sortedUrl2 = url2.split('').sort().join('');
//     return sortedUrl1 === sortedUrl2;
// }

function normalizeUri(uri: string): string {
    const url = new URL(uri);

    // Normalize the scheme and host
    url.protocol = url.protocol.toLowerCase();
    url.hostname = url.hostname.toLowerCase();

    // Sort and decode query parameters
    const queryParams = new URLSearchParams(url.search);
    const sortedAndDecodedParams = new URLSearchParams();
    Array.from(queryParams.keys()).sort().forEach(key => {
        sortedAndDecodedParams.set(key, decodeURIComponent(queryParams.get(key) as string));
    });
    url.search = sortedAndDecodedParams.toString();

    return url.toString();
}

export function isEquivalentUris(uri1: string, uri2: string): boolean {
    return normalizeUri(uri1) === normalizeUri(uri2);
}