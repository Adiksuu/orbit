import { AlertItem } from '@/types/Alert';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    BadgeInfo,
    CheckCircle,
    LucideIcon,
    X,
    XCircle,
} from 'lucide-react';

const alertVariants = cva(
    'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all',
    {
        variants: {
            intent: {
                success: 'bg-green-50 border-green-200 text-green-800',
                error: 'bg-red-50 border-red-200 text-red-800',
                warning: 'bg-amber-50 border-amber-200 text-amber-800',
                information: 'bg-sky-50 border-sky-200 text-sky-800',
            },
        },
        defaultVariants: {
            intent: 'success',
        },
    },
);

const iconVariants = cva('w-5 h-5 mt-0.5 flex-shrink-0', {
    variants: {
        intent: {
            success: 'text-green-500',
            error: 'text-red-500',
            warning: 'text-amber-500',
            information: 'text-sky-500',
        },
    },
    defaultVariants: {
        intent: 'success',
    },
});

type AlertIntent = NonNullable<VariantProps<typeof alertVariants>['intent']>;

const alertIcons: Record<AlertIntent, LucideIcon> = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    information: BadgeInfo,
};

interface AlertProps {
    alert: AlertItem;
    onClose: () => void;
}

export const Alert = ({ alert, onClose }: AlertProps) => {
    const { message, type } = alert;
    const intent = type as AlertIntent;

    const Icon = alertIcons[intent];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className={alertVariants({ intent })}
        >
            <Icon className={iconVariants({ intent })} />

            <div className="flex-1 text-sm font-medium leading-5">
                {message}
            </div>

            <button
                onClick={onClose}
                className="rounded p-0.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
};
