import { ResultResp } from "../BaseResp";
import { BaseResp } from "../BaseResp";

export interface GetDashboardResp extends BaseResp {
    result: ResultDashboard;
}

interface ResultDashboard extends ResultResp {
    data: {
        total_campaign: number;
        total_success: number;
        total_failed: number;
        total_pending: number;
        total_facebook_connect: number;
        total_page_connect: number;
        total_template: number;
    }
}