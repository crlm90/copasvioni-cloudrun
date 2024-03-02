import { BaseResp, ResultResp } from "@/entity/BaseResp";
import { Page } from "./Page";

export interface GetPageDetailResp extends BaseResp {
    result: ResultPageDetail;
}

interface ResultPageDetail extends ResultResp {
    data: Page;
}