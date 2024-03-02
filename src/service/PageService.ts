import { Observable, map } from "rxjs";
import { BaseService } from "./BaseService";
import { AxiosInstance } from "axios";
import { GetPageReq } from "@/entity/page/GetPageReq";
import { GetPageResp } from "@/entity/page/GetPageResp";
import { GetPageDetailResp } from "@/entity/page/GetPageDetailResp";

export interface PageService {
    getPage(page: GetPageReq): Observable<GetPageResp>;
    getPageDetail(page: string): Observable<GetPageDetailResp>;
}

export class PageServiceImpl extends BaseService implements PageService {
    readonly API_ENDPOINT = "/page";

    constructor(
        protected axiosClient: AxiosInstance,
    ) {
        super(axiosClient);
    }

    getPage(template: GetPageReq): Observable<GetPageResp> {
        const params: any = {
            page: template.page,
            limit: template.limit,
        }

        if (template.sort_by?.trim().length > 0) {
            params["sort-by"] = template.sort_by;
        }

        if (template.audience_name?.trim().length > 0) {
            params["audience-name"] = template.audience_name;
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

    getPageDetail(pageId: string): Observable<GetPageDetailResp> {
        return this.httpGet(`${this.API_ENDPOINT}/${pageId}`)
            .pipe(
                map((response) => {
                    return JSON.parse(JSON.stringify(response.data as string))
                })
            )
    }
}