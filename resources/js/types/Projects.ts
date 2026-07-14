import { Issue } from '@/types/Issues';

export interface Project {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: ProjectColors;
    created_at: number;
    updated_at: number;
    issues?: Issue[];
    columns?: Record<string, boolean>;
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

export const AVAILABLE_COLORS: ProjectColors[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'lime',
    'blue',
    'sky',
    'violet',
    'purple',
    'pink',
];
