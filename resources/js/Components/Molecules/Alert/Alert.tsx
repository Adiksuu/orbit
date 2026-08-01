import Icon from '@/Components/Atoms/Icon/Icon';
import { AlertItem } from '@/types/Alert';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { icons, X } from 'lucide-react';

const alertVariants = cva(
    'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md max-w-md w-full transition-all duration-300 bg-[var(--bg-color)] text-[var(--text-color)]',
    {
        variants: {
            intent: {
                success: 'border-[var(--success-color)]/30',
                error: 'border-[var(--error-color)]/30',
                warning: 'border-[var(--warning-color)]/30',
                information: 'border-[var(--info-color)]/30',
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
            success: 'text-[var(--success-color)]',
            error: 'text-[var(--error-color)]',
            warning: 'text-[var(--warning-color)]',
            information: 'text-[var(--info-color)]',
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
    const { message, type, actionUrl } = alert;

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
                {actionUrl && (
                    <a
                        href={actionUrl}
                        className="mt-1 block text-xs font-semibold underline underline-offset-2 hover:opacity-80"
                    >
                        View details
                    </a>
                )}
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
