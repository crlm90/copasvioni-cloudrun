import { NewMessage } from "../message/CreateTemplateReq";

export interface CreateCampaignReq {
    page_id: string;
    campaign_name: string;
    is_scheduled: boolean;
    scheduled_date: string;
    message_list: NewMessage[];
    template_id: string;
    interval_min: number;
    interval_max: number;
    audience_list: string[];
}