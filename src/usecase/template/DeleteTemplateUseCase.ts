import { BaseResp } from "@/entity/BaseResp";
import { GetDetailTemplateReq } from "@/entity/message/GetDetailTemplateReq";
import { TemplateService } from "@/service/TemplateService";
import { Observable } from "rxjs";

export interface DeleteTemplateUseCase {
    execute(template: GetDetailTemplateReq): Observable<BaseResp>
}

export class DeleteTemplateUseCaseImpl implements DeleteTemplateUseCase {
    constructor(private templateService: TemplateService) {}

    execute(template: GetDetailTemplateReq): Observable<BaseResp> {
        return this.templateService.deleteTemplate(template);
    }
}