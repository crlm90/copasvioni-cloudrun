import { UpdatedMessage } from "../message/UpdateTemplateReq";

export interface UpdateCampaignReq {
    campaign_id: string;
    campaign_name: string;
    is_scheduled: boolean;
    scheduled_date: string;
    message_list: UpdatedMessage[];
    template_id: string;
    interval_min: number;
    interval_max: number;
    audience_list: string[];
}