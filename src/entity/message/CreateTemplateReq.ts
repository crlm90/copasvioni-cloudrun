export interface CreateTemplateReq {
    template_name: string;
    message_list: NewMessage[];
}

export interface NewMessage {
    message: string;
    message_type: string;
    message_order: string;
}