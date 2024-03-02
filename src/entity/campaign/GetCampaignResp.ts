import {BaseResp, ResultResp} from "@/entity/BaseResp";
import {Campaign} from "@/entity/campaign/Campaign";

export interface GetCampaignResp extends BaseResp {
    result: ResultCampaign;
}

interface ResultCampaign extends ResultResp {
    data: {
        content: {
            campaign_list: Campaign[];
        }
        total_elements: number;
    }
}