import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    size: parseAsInteger.withDefault(10),
    q: parseAsString.withDefault(""),
    status: parseAsString.withDefault("all"),
});
