import { BaseResp, ResultResp } from "@/entity/BaseResp";
import { Group } from "./Group";

export interface GetGroupResp extends BaseResp {
    result: ResultGroup;
}

interface ResultGroup extends ResultResp {
    data: {
        content: {
            group_list: Group[];
        }
        total_elements: number;
    }
}