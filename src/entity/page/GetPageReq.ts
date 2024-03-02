export interface GetPageReq {
    audience_name: string;
    page_name: string;
    sort_by: string;
    page: number;
    limit: number;
}