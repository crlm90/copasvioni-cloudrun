export interface GetLoginHistoryReq {
    user_id: string;
    date: string;
    browser: string;
    login_ip: string;
    sort_by: string;
    page: number;
    limit: number;
}