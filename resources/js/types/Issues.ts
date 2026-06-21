type IssueLabel = 'bug' | 'feature' | 'performance' | 'design' | 'ux' | 'chore';

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
