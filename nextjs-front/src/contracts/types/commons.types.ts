import {PageMetadata} from "@/contracts/customer-service/generated/models";

export interface IPage<T> {
    content: T[];
    metadata: PageMetadata;
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