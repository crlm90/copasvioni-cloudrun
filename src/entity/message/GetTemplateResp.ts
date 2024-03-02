import { ResultResp } from "../BaseResp";
import { BaseResp } from "../BaseResp";
import { TemplateMessage } from "./TemplateMessage";

export interface GetTemplateResp extends BaseResp {
    result: ResultTemplate;
}

interface ResultTemplate extends ResultResp {
    data: {
        content: {
            template_list: TemplateMessage[];
        }
        total_elements: number;
    }
}