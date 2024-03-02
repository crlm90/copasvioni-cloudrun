export interface GetCampaignReq {
    campaign_name: string;
    page_name: string;
    sort_by: string;
    page: number;
    limit: number;
}