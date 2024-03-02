import { GetDetailTemplateReq } from "./GetDetailTemplateReq";

export interface UpdateTemplateReq extends GetDetailTemplateReq {
    template_name: string;
    message_list: UpdatedMessage[];
}

export interface UpdatedMessage {
    message_id: string;
    message: string;
    message_type: string;
    message_order: string;
    flag_delete: boolean;
}