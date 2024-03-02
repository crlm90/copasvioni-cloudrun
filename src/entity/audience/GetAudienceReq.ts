export interface GetAudienceReq {
    audience_name: string;
    page_id: string;
    page_name: string;
    sort_by: string;
    page: number;
    limit: number;
}