import { GetAudienceReq } from "@/entity/audience/GetAudienceReq";
import { GetAudienceResp } from "@/entity/audience/GetAudienceResp";
import { AudienceService } from "@/service/AudienceService";
import { Observable } from "rxjs";

export interface GetAudienceUseCase {
    execute(audience: GetAudienceReq): Observable<GetAudienceResp>
}

export class GetAudienceUseCaseImpl implements GetAudienceUseCase {
    constructor(private audienceService: AudienceService) {}

    execute(page: GetAudienceReq): Observable<GetAudienceResp> {
        return this.audienceService.getAudience(page);
    }
}