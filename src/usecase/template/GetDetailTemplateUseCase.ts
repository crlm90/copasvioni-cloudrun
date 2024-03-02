import { GetDetailTemplateReq } from "@/entity/message/GetDetailTemplateReq";
import { GetDetailTemplateResp } from "@/entity/message/GetDetailTemplateResp";
import { TemplateService } from "@/service/TemplateService";
import { Observable } from "rxjs";

export interface GetDetailTemplateUseCase {
    execute(template: GetDetailTemplateReq): Observable<GetDetailTemplateResp>
}

export class GetDetailTemplateUseCaseImpl implements GetDetailTemplateUseCase {
    constructor(private templateService: TemplateService) {}

    execute(template: GetDetailTemplateReq): Observable<GetDetailTemplateResp> {
        return this.templateService.getDetailTemplate(template);
    }
}