import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsParsers = {
    page: parseAsInteger.withDefault(1),
    size: parseAsInteger.withDefault(10),
    q: parseAsString.withDefault(""),
    productLine: parseAsString.withDefault(""),
    productScale: parseAsString.withDefault(""),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
