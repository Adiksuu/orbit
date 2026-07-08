import { Alert } from '@/Components/Molecules/Alert/Alert';
import { AlertItem } from '@/types/Alert';
import { AnimatePresence } from 'framer-motion';

interface AlertContainerProps {
    alerts: AlertItem[];
    removeAlert: (id: string) => void;
}

export const AlertContainer = ({
    alerts,
    removeAlert,
}: AlertContainerProps) => {
    return (
        <div className="pointer-events-none fixed right-5 top-5 z-50 flex w-full max-w-sm flex-col gap-3">
            <AnimatePresence>
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        alert={alert}
                        onClose={() => removeAlert(alert.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
