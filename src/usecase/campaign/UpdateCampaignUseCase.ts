import { FieldError } from "@/entity/BaseResp";
import { BaseResp } from "@/entity/BaseResp";
import { UpdateCampaignReq } from "@/entity/campaign/UpdateCampaignReq";
import { CampaignService } from "@/service/CampaignService";
import { Observable } from "rxjs";

export interface UpdateCampaignUseCase {
    validate(campaign: UpdateCampaignReq): FieldError[];
    execute(campaign: UpdateCampaignReq): Observable<BaseResp>
}

export class UpdateCampaignUseCaseImpl implements UpdateCampaignUseCase {
    constructor(private campaignService: CampaignService) {}

    validate(campaign: UpdateCampaignReq): FieldError[] {
        const error: FieldError[] = [];

        if (campaign.campaign_name.trim().length < 1) {
            error.push({
                field: "campaign_name",
                message: ["Required"]
            });
        }

        if (campaign.is_scheduled) {
            if (campaign.scheduled_date.trim().length < 1) {
                error.push({
                    field: "scheduled_date",
                    message: ["Required"]
                },{
                    field: "scheduled_time",
                    message: ["Required"]
                });
            } else {
                const dateTime = campaign.scheduled_date.trim().split(" ");
                const date = dateTime[0];
                const time = dateTime[1];

                if (date.trim().length < 1) {
                    error.push({
                        field: "scheduled_date",
                        message: ["Required"]
                    });
                } else if (time.trim().length < 1) {
                    error.push({
                        field: "scheduled_time",
                        message: ["Required"]
                    });
                }
            }
        }

        if (campaign.interval_min < 1) {
            error.push({
                field: "interval_min",
                message: ["Required"]
            });
        }

        if (campaign.interval_max < 1) {
            error.push({
                field: "interval_max",
                message: ["Required"]
            });
        }

        if (campaign.audience_list.length < 1) {
            error.push({
                field: "audience_list",
                message: ["Required"]
            });
        }

        if (campaign.template_id.length < 1 && campaign.message_list.length < 1) {
            error.push({
                field: "template_id",
                message: ["Required"]
            });
        }

        return error;
    }

    execute(campaign: UpdateCampaignReq): Observable<BaseResp> {
        return this.campaignService.updateCampaign({...campaign});
    }
}