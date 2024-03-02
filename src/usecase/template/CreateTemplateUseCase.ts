import { FieldError } from "@/entity/BaseResp";
import { BaseResp } from "@/entity/BaseResp";
import { CreateTemplateReq } from "@/entity/message/CreateTemplateReq";
import { TemplateService } from "@/service/TemplateService";
import { Observable } from "rxjs";

export interface CreateTemplateUseCase {
    validate(template: CreateTemplateReq): FieldError[];
    execute(template: CreateTemplateReq): Observable<BaseResp>
}

export class CreateTemplateUseCaseImpl implements CreateTemplateUseCase {
    constructor(private templateService: TemplateService) {}

    validate(template: CreateTemplateReq): FieldError[] {
        const error: FieldError[] = [];

        if (template.template_name.trim().length < 1) {
            error.push({
                field: "template_name",
                message: ["Required"]
            });
        }

        return error;
    }

    execute(template: CreateTemplateReq): Observable<BaseResp> {
        return this.templateService.createTemplate({...template});
    }
}