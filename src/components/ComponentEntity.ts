export interface TableHeader {
    /**
     * Don't use space
     */
    key: string;
    name: string;
    isSortable: boolean;
}

export interface SearchCriteria {
    page: number;
    rowPerPage: number;
    sortKey: string;
    sortOrder: string;
}

export interface OptionEntity {
    key: string;
    value: string;
}

export interface MultiselectEntity {
    value: string;
    label: string;
}