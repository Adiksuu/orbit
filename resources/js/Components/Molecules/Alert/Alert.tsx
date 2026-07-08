import Icon from '@/Components/Atoms/Icon/Icon';
import { AlertItem } from '@/types/Alert';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { icons, X } from 'lucide-react';

const alertVariants = cva(
    'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md max-w-md w-full transition-all duration-300',
    {
        variants: {
            intent: {
                success:
                    'bg-emerald-50/90 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800/50 dark:text-emerald-200',
                error: 'bg-rose-50/90 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800/50 dark:text-rose-200',
                warning:
                    'bg-amber-50/90 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/50 dark:text-amber-200',
                information:
                    'bg-blue-50/90 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-800/50 dark:text-blue-200',
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
            success: 'text-emerald-600 dark:text-emerald-400',
            error: 'text-rose-600 dark:text-rose-400',
            warning: 'text-amber-600 dark:text-amber-400',
            information: 'text-blue-600 dark:text-blue-400',
        },
    },
    defaultVariants: {
        intent: 'success',
    },
});

type AlertIntent = NonNullable<VariantProps<typeof alertVariants>['intent']>;

const alertIcons: Record<AlertIntent, keyof typeof icons> = {
    success: 'CircleCheck',
    error: 'CircleX',
    warning: 'TriangleAlert',
    information: 'BadgeInfo',
};

interface AlertProps {
    alert: AlertItem;
    onClose: () => void;
}

export const Alert = ({ alert, onClose }: AlertProps) => {
    const { message, type } = alert;

    const intent = (
        alertIcons[type as AlertIntent] ? type : 'information'
    ) as AlertIntent;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={alertVariants({ intent })}
        >
            <Icon
                name={alertIcons[intent]}
                className={iconVariants({ intent })}
            />

            <div className="flex-1 select-none text-sm font-medium leading-5">
                {message}
            </div>

            <button
                onClick={onClose}
                type="button"
                className="text-current/50 hover:bg-current/10 focus-visible:ring-current/40 group relative -mr-1 -mt-1 rounded-lg p-1.5 transition-colors hover:text-current focus-visible:outline-none focus-visible:ring-2"
                aria-label="Close Alert"
            >
                <X className="h-4 w-4 transition-transform duration-150 group-hover:scale-105" />
            </button>
        </motion.div>
    );
};
