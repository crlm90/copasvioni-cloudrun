import { GetTemplateReq } from "@/entity/message/GetTemplateReq";
import { GetTemplateResp } from "@/entity/message/GetTemplateResp";
import { TemplateService } from "@/service/TemplateService";
import { Observable } from "rxjs";

export interface GetTemplateUseCase {
    execute(template: GetTemplateReq): Observable<GetTemplateResp>
}

export class GetTemplateUseCaseImpl implements GetTemplateUseCase {
    constructor(private templateService: TemplateService) {}

    execute(template: GetTemplateReq): Observable<GetTemplateResp> {
        return this.templateService.getTemplate(template);
    }
}