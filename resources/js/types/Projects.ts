export interface Project {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: ProjectColors;
    created_at: number;
    updated_at: number;
}

export type ProjectColors =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'lime'
    | 'blue'
    | 'sky'
    | 'violet'
    | 'purple'
    | 'pink';
