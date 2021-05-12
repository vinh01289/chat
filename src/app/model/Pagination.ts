export interface Pagination<T>{
    pageNumber: number;
    pageSize: number;
    sortOrder: string;
    sortColum: string;
    totalRows: number;
    data: T[];

}