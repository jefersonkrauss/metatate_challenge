export interface BEPagination {
    count: number;
    pageIndex: number;
    perPage: number;
    offset: number;
    totalPages: number;
}

export interface BeResponse<T> {
    status: string;
    message: string;
    data: T;
    pagination?: BEPagination
}