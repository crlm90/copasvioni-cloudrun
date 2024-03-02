import { Observable, map } from "rxjs";
import { GetTemplateReq } from "@/entity/message/GetTemplateReq";
import { GetTemplateResp } from "@/entity/message/GetTemplateResp";
import { BaseService } from "./BaseService";
import { AxiosInstance } from "axios";
import { GetDetailTemplateReq } from "@/entity/message/GetDetailTemplateReq";
import { GetDetailTemplateResp } from "@/entity/message/GetDetailTemplateResp";
import { CreateTemplateReq } from "@/entity/message/CreateTemplateReq";
import { BaseResp } from "@/entity/BaseResp";
import { UpdateTemplateReq } from "@/entity/message/UpdateTemplateReq";
import { TextFormatter } from "@/util/TextFormatter";

export interface TemplateService {
    getTemplate(template: GetTemplateReq): Observable<GetTemplateResp>;
    getDetailTemplate(template: GetDetailTemplateReq): Observable<GetDetailTemplateResp>;
    createTemplate(template: CreateTemplateReq): Observable<BaseResp>;
    updateTemplate(template: UpdateTemplateReq): Observable<BaseResp>;
    deleteTemplate(template: GetDetailTemplateReq): Observable<BaseResp>;
}

export class TemplateServiceImpl extends BaseService implements TemplateService {
    readonly API_ENDPOINT = "/template";

    constructor(
        protected axiosClient: AxiosInstance,
    ) {
        super(axiosClient);
    }

    getTemplate(template: GetTemplateReq): Observable<GetTemplateResp> {
        const params: any = {
            page: template.page,
            limit: template.limit,
        }

        if (template.sort_by?.trim().length > 0) {
            params["sort-by"] = template.sort_by;
        }

        if (template.template_name?.trim().length > 0) {
            params["template-name"] = template.template_name;
        }

        return this.httpGet(this.API_ENDPOINT, { params })
            .pipe(
                map((response) => {
                    return JSON.parse(JSON.stringify(response.data as string))
                })
            )

    }

    getDetailTemplate(template: GetDetailTemplateReq): Observable<GetDetailTemplateResp> {
        return this.httpGet(`${this.API_ENDPOINT}/${template.template_id}`)
            .pipe(
                map((response) => {
                    const tempResp: any = response;
                    if (tempResp.data)
                        return JSON.parse(JSON.stringify(response.data as string))
                    return JSON.parse(JSON.stringify(tempResp as string))
                })
            )
    }
    
    createTemplate(template: CreateTemplateReq): Observable<BaseResp> {
        return this.httpPost(this.API_ENDPOINT, TextFormatter.convertEmptyPropertyToNull(template))
            .pipe(
                map((response) => JSON.parse(JSON.stringify(response.data as string)))
            )
    }
    
    updateTemplate(template: UpdateTemplateReq): Observable<BaseResp> {
        return this.httpPut(this.API_ENDPOINT, TextFormatter.convertEmptyPropertyToNull(template))
            .pipe(
                map((response) => JSON.parse(JSON.stringify(response.data as string)))
            )
    }

    deleteTemplate(template: GetDetailTemplateReq): Observable<BaseResp> {
        return this.httpDelete(`${this.API_ENDPOINT}/${template.template_id}`)
            .pipe(
                map((response) => JSON.parse(JSON.stringify(response.data as string)))
            )
    }
}