import { PageProps } from '@/types/index';

export type AlertType = 'success' | 'error' | 'warning' | 'information';

export interface AlertItem {
    id: string;
    message: string;
    type: AlertType;
}
export interface InertiaPageProps extends PageProps {
    flash: {
        success?: string;
        error?: string;
        warning?: string;
        information?: string;
    };
}

export interface AlertContextType {
    addAlert: (message: string, type?: AlertType, duration?: number) => void;
    removeAlert: (id: string) => void;
    alerts: AlertItem[];
}
