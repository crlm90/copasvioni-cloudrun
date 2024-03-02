import { Group } from "./Group";

export interface Audience {
    created_at: string;
    audience_id: string;
    audience_name: string;
    audience_photo: string;
    group_list: Group[];
    is_deleted: boolean;
    page_id: string;
}