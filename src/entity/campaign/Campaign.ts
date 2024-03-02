import {Message} from "@/entity/message/TemplateMessage";
import { Audience } from "../audience/Audience";

export interface Campaign {
    campaign_id: string;
    campaign_name: string;
    page_id: string;
    page_name: string;
    campaign_status: string;
    campaign_date: string | null;
    created_at: string;
    total_amount: number;
    pending_amount: number;
    failed_amount: number;
    success_amount: number;
    isExpanded: boolean;
    clicked?: string;
    read?: string;
}

export interface DetailCampaign {
    audience_list: Audience[];
    campaign_name: string;
    campaign_status: string;
    page_id: string;
    page_name: string;
    is_scheduled: boolean;
    scheduled_date: string;
    interval_min: number;
    interval_max: number;
    message_list: Message[];
    template_id: string;
    template_name: string;
}