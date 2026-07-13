export type ShortcutAction = () => void;

export interface ShortcutDefinition {
    key: string; // e.g., 'c', 'g p', 'ctrl+k', '/'
    action: ShortcutAction;
    description: string;
    category?: 'Navigation' | 'Creation' | 'Search' | 'View' | 'Action';
    disabled?: boolean;
}

export interface ShortcutContextType {
    register: (shortcut: ShortcutDefinition) => () => void;
    registerBatch: (shortcuts: ShortcutDefinition[]) => () => void;
    shortcuts: ShortcutDefinition[];
}
