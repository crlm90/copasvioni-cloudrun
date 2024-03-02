import { BaseResp, ResultResp } from "@/entity/BaseResp";
import {DetailCampaign} from "@/entity/campaign/Campaign";

export interface GetDetailCampaignResp extends BaseResp {
    result: ResultDetailCampaign;
}

interface ResultDetailCampaign extends ResultResp {
    data: DetailCampaign;
}