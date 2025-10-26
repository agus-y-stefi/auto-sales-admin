
export interface IPage<T> {
    content: T[];
    metadata: PageMetadata;
}

export interface Sort{
    property: string;
    direction: string;
}

export interface PageMetadata{
    totalElements?: number;
    totalPages?: number;
    number?: number;
    size?: number;
    first?: boolean;
    last?: boolean;
    hasNext?: boolean;
    hasPrev?: boolean;
    sort?: Sort[];
}

export const DEFAULT_PAGE_NULL = {
    content: [],
    metadata: {
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0
    }
}

export interface SortDescriptor {
    column: string
    direction: "ascending" | "descending"
}