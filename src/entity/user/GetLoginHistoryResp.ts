import { ResultResp } from "../BaseResp";
import { BaseResp } from "../BaseResp";
import { LoginHistory } from "./LoginHistory";

export interface GetLoginHistoryResp extends BaseResp {
    result: ResultLoginHistory;
}

interface ResultLoginHistory extends ResultResp {
    data: {
        content: {
            user_list: LoginHistory[];
        }
        total_elements: number;
    }
}