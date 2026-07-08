import { AlertContainer } from '@/Components/Organisms/AlertContainer/AlertContainer';
import {
    AlertContextType,
    AlertItem,
    AlertType,
    InertiaPageProps,
} from '@/types/Alert';
import { usePage } from '@inertiajs/react';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const addAlert = useCallback(
        (message: string, type: AlertType = 'success', duration = 4000) => {
            const id = Math.random().toString(36).substring(2, 9);

            setAlerts((prev) => [...prev, { id, message, type }]);

            if (duration) {
                setTimeout(() => {
                    removeAlert(id);
                }, duration);
            }
        },
        [],
    );

    const removeAlert = useCallback((id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, []);

    const { flash } = usePage<InertiaPageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            addAlert(flash.success, 'success');
        }
        if (flash?.error) {
            addAlert(flash.error, 'error');
        }
        if (flash?.warning) {
            addAlert(flash.warning, 'warning');
        }
        if (flash?.information) {
            addAlert(flash.information, 'information');
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
