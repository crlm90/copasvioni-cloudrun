import { BaseResp } from "@/entity/BaseResp";
import { GetDetailCampaignReq } from "@/entity/campaign/GetDetailCampaignReq";
import { CampaignService } from "@/service/CampaignService";
import { Observable } from "rxjs";

export interface DeleteCampaignUseCase {
    execute(campaign: GetDetailCampaignReq): Observable<BaseResp>
}

export class DeleteCampaignUseCaseImpl implements DeleteCampaignUseCase {
    constructor(private campaignService: CampaignService) {}

    execute(campaign: GetDetailCampaignReq): Observable<BaseResp> {
        return this.campaignService.deleteCampaign(campaign);
    }
}