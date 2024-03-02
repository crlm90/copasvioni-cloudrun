export interface Page {
    page_id: string;
    page_name: string;
    created_at: string;
    audience_list: AudiencePage[];
}

export interface AudiencePage {
    audience_id: string;
    audience_name: string;
    audience_photo: string;
}