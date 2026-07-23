import { AlertContainer } from '@/Components/Organisms/AlertContainer/AlertContainer';
import {
    AlertContextType,
    AlertItem,
    AlertType,
    InertiaPageProps,
} from '@/types/Alert';
import { NotificationTypes } from '@/types/Notification';
import { useForm, usePage } from '@inertiajs/react';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const toNotificationType = (type: AlertType): NotificationTypes =>
    type === 'information' ? 'info' : type;

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const { post, transform } = useForm();

    const addAlert = useCallback(
        (
            message: string,
            type: AlertType = 'success',
            duration = 4000,
            actionUrl?: string,
        ) => {
            const id = Math.random().toString(36).substring(2, 9);

            setAlerts((prev) => [...prev, { id, message, type, actionUrl }]);

            const notificationType = toNotificationType(type);
            transform(() => ({
                type: notificationType,
                title:
                    notificationType.charAt(0).toUpperCase() +
                    notificationType.slice(1),
                message,
                read: false,
                action_url: actionUrl ?? null,
            }));
            post('/notifications', {
                preserveScroll: true,
                preserveState: true,
            });

            if (duration) {
                setTimeout(() => {
                    removeAlert(id);
                }, duration);
            }
        },
        [post, transform],
    );

    const removeAlert = useCallback((id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, []);

    const { flash } = usePage<InertiaPageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            addAlert(flash.success, 'success', 4000, flash.action_url);
        }
        if (flash?.error) {
            addAlert(flash.error, 'error', 4000, flash.action_url);
        }
        if (flash?.warning) {
            addAlert(flash.warning, 'warning', 4000, flash.action_url);
        }
        if (flash?.information) {
            addAlert(flash.information, 'information', 4000, flash.action_url);
        }
    }, [flash, addAlert]);

    return (
        <AlertContext.Provider value={{ addAlert, removeAlert, alerts }}>
            {children}
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
