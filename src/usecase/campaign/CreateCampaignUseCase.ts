import { FieldError } from "@/entity/BaseResp";
import { BaseResp } from "@/entity/BaseResp";
import { CreateCampaignReq } from "@/entity/campaign/CreateCampaignReq";
import { CampaignService } from "@/service/CampaignService";
import { Observable } from "rxjs";

export interface CreateCampaignUseCase {
    validate(campaign: CreateCampaignReq): FieldError[];
    execute(campaign: CreateCampaignReq): Observable<BaseResp>
}

export class CreateCampaignUseCaseImpl implements CreateCampaignUseCase {
    constructor(private campaignService: CampaignService) {}

    validate(campaign: CreateCampaignReq): FieldError[] {
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

        if (campaign.template_id.trim().length < 1 && campaign.message_list[0].message.length < 1) {
            error.push({
                field: "template_id",
                message: ["Required"]
            });
        }

        return error;
    }

    execute(campaign: CreateCampaignReq): Observable<BaseResp> {
        return this.campaignService.createCampaign({...campaign});
    }
}