import { GetGroupReq } from "@/entity/audience/GetGroupReq";
import { GetGroupResp } from "@/entity/audience/GetGroupResp";
import { AudienceService } from "@/service/AudienceService";
import { Observable } from "rxjs";

export interface GetGroupUseCase {
    execute(audience: GetGroupReq): Observable<GetGroupResp>
}

export class GetGroupUseCaseImpl implements GetGroupUseCase {
    constructor(private audienceService: AudienceService) {}

    execute(page: GetGroupReq): Observable<GetGroupResp> {
        return this.audienceService.getGroup(page);
    }
}