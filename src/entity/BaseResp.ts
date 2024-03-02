export interface BaseResp {
    timestamp: string;
    code: number;
    app_code: string;
    description: string;
    message: string;
    result?: ResultResp;
}

export interface ResultResp {
    field_error_list: FieldError[];
    message: string;
    /**
     * Don't use `{}` as a type. `{}` actually means "any non-nullish value".
    - If you want a type meaning "any value", you probably want `unknown` instead.
     */
    data?: unknown;
}

/**
 * Interface error validation from BE
 */
export interface FieldError {
    field: string;
    message: string[];
}