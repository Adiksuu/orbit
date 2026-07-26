import Badge from '@/Components/Atoms/Badge/Badge';
import { StatusIconProps } from '@/types/Components';
import { cn } from '@/utils/cn';

export const StatusIcon = ({ status, className }: StatusIconProps) => {
    const s = status?.toLowerCase();

    if (s === 'done' || s === 'completed' || s === 'closed') {
        return (
            <Badge variant={'ghost'} tooltip={true} tooltipText={status}>
                <span
                    className={cn(
                        'inline-flex items-center text-indigo-500',
                        className,
                    )}
                    title={status}
                >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="6" />
                        <path
                            d="M5 8l2 2 4-4"
                            stroke="#000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </Badge>
        );
    }

    return (
        <Badge variant={'ghost'} tooltip={true} tooltipText={status}>
            <span
                className={cn(
                    'inline-flex items-center text-amber-500',
                    className,
                )}
                title={status}
            >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                    <circle
                        cx="8"
                        cy="8"
                        r="5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    <path d="M8 3a5 5 0 0 1 5 5H8V3z" />
                </svg>
            </span>
        </Badge>
    );
};
