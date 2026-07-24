import { PageProps } from '@/types/index';

export type AlertType = 'success' | 'error' | 'warning' | 'information';

export interface AlertItem {
    id: string;
    message: string;
    type: AlertType;
    actionUrl?: string;
}
export interface InertiaPageProps extends PageProps {
    flash: {
        success?: string;
        error?: string;
        warning?: string;
        information?: string;
        action_url?: string;
    };
}

export interface AlertContextType {
    addAlert: (
        message: string,
        type?: AlertType,
        duration?: number,
        actionUrl?: string,
    ) => void;
    removeAlert: (id: string) => void;
    alerts: AlertItem[];
}
