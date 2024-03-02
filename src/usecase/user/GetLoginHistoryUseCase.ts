import { GetLoginHistoryReq } from "@/entity/user/GetLoginHistoryReq";
import { GetLoginHistoryResp } from "@/entity/user/GetLoginHistoryResp";
import { UserService } from "@/service/UserService";
import { Observable } from "rxjs";

export interface GetLoginHistoryUseCase {
    execute(req: GetLoginHistoryReq): Observable<GetLoginHistoryResp>
}

export class GetLoginHistoryUseCaseImpl implements GetLoginHistoryUseCase {
    constructor(private userService: UserService) {}

    execute(req: GetLoginHistoryReq): Observable<GetLoginHistoryResp> {
        return this.userService.getLoginHistory(req);
    }
}