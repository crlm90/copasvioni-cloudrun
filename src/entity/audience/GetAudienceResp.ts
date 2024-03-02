import {BaseResp, ResultResp} from "@/entity/BaseResp";
import { Audience } from "./Audience";

export interface GetAudienceResp extends BaseResp {
    result: ResultAudience;
}

interface ResultAudience extends ResultResp {
    data: {
        content: {
            audience_list: Audience[];
        }
        total_elements: number;
    }
}