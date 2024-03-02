import { BaseResp, ResultResp } from "@/entity/BaseResp";
import { FacebookLinked } from "./FacebookLinked";

export interface GetFacebookLinkedResp extends BaseResp {
    result: ResultFacebookLinked;
}

interface ResultFacebookLinked extends ResultResp {
    data: {
        content: {
            facebook_linked_list: FacebookLinked[];
        }
        total_elements: number;
    }
}