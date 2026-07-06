export type IssueLabel =
    | 'bug'
    | 'feature'
    | 'performance'
    | 'design'
    | 'ux'
    | 'chore';

export interface Issue {
    id: string;
    title: string;
    description?: string;
    status: 'open' | 'closed';
    priority: 'high' | 'medium' | 'low';
    project_id: number;
    user_id: number;
    assignee_id?: number;
    created_at?: number;
    updated_at?: number;
    assignee?: {
        avatar: string;
        created_at: string;
        email: string;
        id: number;
        name: string;
        password: string;
        updated_at: string;
    };
    labels?: IssueLabel[];
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type IssuePageLooks = 'List' | 'Board';
export type IssuePriority = 'high' | 'medium' | 'low';

export interface ProductivityTrendProps {
    count: number;
    day: string;
}
export type Status = 'open' | 'closed';
