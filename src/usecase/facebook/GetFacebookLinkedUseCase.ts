import { GetFacebookLinkedReq } from "@/entity/facebook/GetFacebookLinkedReq";
import { GetFacebookLinkedResp } from "@/entity/facebook/GetFacebookLinkedResp";
import { FacebookService } from "@/service/FacebookService";
import { Observable } from "rxjs";

export interface GetFacebookLinkedUseCase {
    execute(page: GetFacebookLinkedReq): Observable<GetFacebookLinkedResp>
}

export class GetFacebookLinkedUseCaseImpl implements GetFacebookLinkedUseCase {
    constructor(private pageService: FacebookService) {}

    execute(page: GetFacebookLinkedReq): Observable<GetFacebookLinkedResp> {
        return this.pageService.getFacebookLinked(page);
    }
}