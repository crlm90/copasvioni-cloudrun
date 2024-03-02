import { GetDashboardResp } from "@/entity/user/GetDashboardResp";
import { UserService } from "@/service/UserService";
import { Observable } from "rxjs";

export interface GetDashboardUseCase {
    execute(): Observable<GetDashboardResp>
}

export class GetDashboardUseCaseImpl implements GetDashboardUseCase {
    constructor(private userService: UserService) {}

    execute(): Observable<GetDashboardResp> {
        return this.userService.getDashboard();
    }
}