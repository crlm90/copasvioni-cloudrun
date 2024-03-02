import { Observable } from "rxjs";
import { GetPageDetailResp } from "@/entity/page/GetPageDetailResp";
import { PageService } from "@/service/PageService";

export interface GetPageDetailUseCase {
    execute(page: string): Observable<GetPageDetailResp>
}

export class GetPageDetailUseCaseImpl implements GetPageDetailUseCase {
    constructor(private pageService: PageService) {}

    execute(page: string): Observable<GetPageDetailResp> {
        return this.pageService.getPageDetail(page);
    }
}