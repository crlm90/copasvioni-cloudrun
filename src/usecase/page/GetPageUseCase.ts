import { Observable } from "rxjs";
import { GetPageReq } from "@/entity/page/GetPageReq";
import { GetPageResp } from "@/entity/page/GetPageResp";
import { PageService } from "@/service/PageService";

export interface GetPageUseCase {
    execute(page: GetPageReq): Observable<GetPageResp>
}

export class GetPageUseCaseImpl implements GetPageUseCase {
    constructor(private pageService: PageService) {}

    execute(page: GetPageReq): Observable<GetPageResp> {
        return this.pageService.getPage(page);
    }
}