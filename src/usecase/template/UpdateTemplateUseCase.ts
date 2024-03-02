import { BaseResp, FieldError } from "@/entity/BaseResp";
import { UpdateTemplateReq } from "@/entity/message/UpdateTemplateReq";
import { TemplateService } from "@/service/TemplateService";
import { Observable } from "rxjs";

export interface UpdateTemplateUseCase {
    validate(template: UpdateTemplateReq): FieldError[];
    execute(template: UpdateTemplateReq): Observable<BaseResp>
}

export class UpdateTemplateUseCaseImpl implements UpdateTemplateUseCase {
    constructor(private templateService: TemplateService) {}

    validate(template: UpdateTemplateReq): FieldError[] {
        const error: FieldError[] = [];

        if (template.template_name.trim().length < 1) {
            error.push({
                field: "template_name",
                message: ["Required"]
            });
        }

        return error;
    }

    execute(template: UpdateTemplateReq): Observable<BaseResp> {
        return this.templateService.updateTemplate({...template});
    }
}