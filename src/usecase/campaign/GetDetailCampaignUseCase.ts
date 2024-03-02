import { GetDetailCampaignReq } from "@/entity/campaign/GetDetailCampaignReq";
import { CampaignService } from "@/service/CampaignService";
import { Observable } from "rxjs";
import {GetDetailCampaignResp} from "@/entity/campaign/GetDetailCampaignResp";

export interface GetDetailCampaignUseCase {
    execute(campaign: GetDetailCampaignReq): Observable<GetDetailCampaignResp>
}

export class GetDetailCampaignUseCaseImpl implements GetDetailCampaignUseCase {
    constructor(private campaignService: CampaignService) {}

    execute(campaign: GetDetailCampaignReq): Observable<GetDetailCampaignResp> {
        return this.campaignService.getDetailCampaign(campaign);
    }
}