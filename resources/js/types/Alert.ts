export type AlertType = 'success' | 'error' | 'warning' | 'information';

export interface AlertItem {
    id: string;
    message: string;
    type: AlertType;
}
