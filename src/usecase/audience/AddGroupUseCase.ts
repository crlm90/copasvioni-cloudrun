import { BaseResp, FieldError } from "@/entity/BaseResp";
import { AddGroupReq } from "@/entity/audience/AddGroupReq";
import { AudienceService } from "@/service/AudienceService";
import { Observable } from "rxjs";

export interface AddGroupUseCase {
    validate(group: AddGroupReq): FieldError[];
    execute(group: AddGroupReq): Observable<BaseResp>
}

export class AddGroupUseCaseImpl implements AddGroupUseCase {
    constructor(private audienceService: AudienceService) {}

    validate(group: AddGroupReq): FieldError[] {
        const errorResult: FieldError[] = [];

        if (group.group_name.length < 1) {
            errorResult.push({
                field: "group_name",
                message: ["Required"]
            });
        }

        if (group.page_id.length < 1) {
            errorResult.push({
                field: "page_id",
                message: ["Required"]
            });
        } else if (group.audience_list.length < 1) {
            errorResult.push({
                field: "audience_list",
                message: ["Required"]
            });
        }

        return errorResult;
    }

    execute(group: AddGroupReq): Observable<BaseResp> {
        return this.audienceService.addGroup(group);
    }
}