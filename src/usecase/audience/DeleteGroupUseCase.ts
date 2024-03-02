import { BaseResp } from "@/entity/BaseResp";
import { GetDetailGroupReq } from "@/entity/audience/GetDetailGroupReq";
import { AudienceService } from "@/service/AudienceService";
import { Observable } from "rxjs";

export interface DeleteGroupUseCase {
    execute(audience: GetDetailGroupReq): Observable<BaseResp>
}

export class DeleteGroupUseCaseImpl implements DeleteGroupUseCase {
    constructor(private audienceService: AudienceService) {}

    execute(group: GetDetailGroupReq): Observable<BaseResp> {
        return this.audienceService.deleteGroup(group);
    }
}