import { Observable } from "rxjs";
import { GetCampaignReq } from "@/entity/campaign/GetCampaignReq";
import { GetCampaignResp } from "@/entity/campaign/GetCampaignResp";
import { CampaignService } from "@/service/CampaignService";

export interface GetCampaignUseCase {
    execute(campaign: GetCampaignReq): Observable<GetCampaignResp>
}

export class GetCampaignUseCaseImpl implements GetCampaignUseCase {
    constructor(private campaignService: CampaignService) {}

    execute(campaign: GetCampaignReq): Observable<GetCampaignResp> {
        return this.campaignService.getCampaign(campaign);
    }
}