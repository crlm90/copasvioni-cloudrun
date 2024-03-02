import { Observable, map } from "rxjs";
import { BaseService } from "./BaseService";
import { AxiosInstance } from "axios";
import { GetCampaignReq } from "@/entity/campaign/GetCampaignReq";
import { GetCampaignResp } from "@/entity/campaign/GetCampaignResp";
import { GetDetailCampaignReq } from "@/entity/campaign/GetDetailCampaignReq";
import { GetDetailCampaignResp } from "@/entity/campaign/GetDetailCampaignResp";
import { BaseResp } from "@/entity/BaseResp";
import { CreateCampaignReq } from "@/entity/campaign/CreateCampaignReq";
import { TextFormatter } from "@/util/TextFormatter";
import { UpdateCampaignReq } from "@/entity/campaign/UpdateCampaignReq";

export interface CampaignService {
    getCampaign(campaign: GetCampaignReq): Observable<GetCampaignResp>;
    deleteCampaign(campaign: GetDetailCampaignReq): Observable<BaseResp>;
    createCampaign(campaign: CreateCampaignReq): Observable<BaseResp>;
    getDetailCampaign(campaign: GetDetailCampaignReq): Observable<GetDetailCampaignResp>;
    updateCampaign(campaign: UpdateCampaignReq): Observable<BaseResp>;
}

export class CampaignServiceImpl extends BaseService implements CampaignService {
    readonly API_ENDPOINT = "/campaign";

    constructor(
        protected axiosClient: AxiosInstance,
    ) {
        super(axiosClient);
    }

    getCampaign(template: GetCampaignReq): Observable<GetCampaignResp> {
        const params: any = {
            page: template.page,
            limit: template.limit,
        }

        if (template.sort_by?.trim().length > 0) {
            params["sort-by"] = template.sort_by;
        }

        if (template.campaign_name?.trim().length > 0) {
            params["campaign-name"] = template.campaign_name;
        }

        if (template.page_name?.trim().length > 0) {
            params["page-name"] = template.page_name;
        }

        return this.httpGet(this.API_ENDPOINT, { params })
            .pipe(
                map((response) => {
                    return JSON.parse(JSON.stringify(response.data as string))
                })
            )
    }

    deleteCampaign(campaign: GetDetailCampaignReq): Observable<BaseResp> {
        return this.httpDelete(`${this.API_ENDPOINT}/${campaign.campaign_id}`)
            .pipe(
                map((response) => JSON.parse(JSON.stringify(response.data as string)))
            )
    }

    createCampaign(campaign: CreateCampaignReq): Observable<BaseResp> {
        return this.httpPost(this.API_ENDPOINT, TextFormatter.convertEmptyPropertyToNull(campaign))
            .pipe(
                map((response) => JSON.parse(JSON.stringify(response.data as string)))
            )
    }

    getDetailCampaign(campaign: GetDetailCampaignReq): Observable<GetDetailCampaignResp> {
        return this.httpGet(`${this.API_ENDPOINT}/${campaign.campaign_id}`)
            .pipe(
                map((response) => JSON.parse(JSON.stringify(response.data as string)))
            )
    }

    updateCampaign(campaign: UpdateCampaignReq): Observable<BaseResp> {
        return this.httpPut(`${this.API_ENDPOINT}/${campaign.campaign_id}`, TextFormatter.convertEmptyPropertyToNull(campaign))
            .pipe(
                map((response) => JSON.parse(JSON.stringify(response.data as string)))
            )
    }
}