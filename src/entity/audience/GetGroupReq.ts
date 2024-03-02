export interface GetGroupReq {
    group_name: string;
    page_id: string;
    page_name: string;
    sort_by: string;
    page: number;
    limit: number;
}