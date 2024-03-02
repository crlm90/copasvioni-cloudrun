import { ResultResp } from "../BaseResp";
import { BaseResp } from "../BaseResp";
import { TemplateMessage } from "./TemplateMessage";

export interface GetDetailTemplateResp extends BaseResp {
    result: ResultDetailTemplate;
}

interface ResultDetailTemplate extends ResultResp {
    data: TemplateMessage;
}