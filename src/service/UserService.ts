import { GetLoginHistoryReq } from "@/entity/user/GetLoginHistoryReq";
import { GetLoginHistoryResp } from "@/entity/user/GetLoginHistoryResp";
import { Observable, map } from "rxjs";
import { BaseService } from "./BaseService";
import { AxiosInstance } from "axios";
import { GetDashboardResp } from "@/entity/user/GetDashboardResp";

export interface UserService {
    getLoginHistory(history: GetLoginHistoryReq): Observable<GetLoginHistoryResp>;
    getDashboard(): Observable<GetDashboardResp>;
}

export class UserServiceImpl extends BaseService implements UserService {
    readonly API_ENDPOINT = "/user";

    constructor(
        protected axiosClient: AxiosInstance,
    ) {
        super(axiosClient);
    }

    getLoginHistory(history: GetLoginHistoryReq): Observable<GetLoginHistoryResp> {
        const params: any = {
            page: history.page,
            limit: history.limit,
        }

        if (history.sort_by?.trim().length > 0) {
            params["sort-by"] = history.sort_by;
        }

        return this.httpGet(`${this.API_ENDPOINT}/history-log`, { params })
            .pipe(
                map((response) => {
                    return JSON.parse(JSON.stringify(response.data as string))
                })
            )
    }

    getDashboard(): Observable<GetDashboardResp> {
        return this.httpGet(`${this.API_ENDPOINT}/dashboard`)
            .pipe(
                map((response) => {
                    return JSON.parse(JSON.stringify(response.data as string))
                })
            )
    }
}