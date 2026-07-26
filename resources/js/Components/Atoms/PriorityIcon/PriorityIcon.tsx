import Badge from '@/Components/Atoms/Badge/Badge';
import { PriorityIconProps } from '@/types/Components';
import { cn } from '@/utils/cn';

export const PriorityIcon = ({ priority, className }: PriorityIconProps) => {
    const p = priority?.toLowerCase();

    if (p === 'high') {
        return (
            <Badge variant={'ghost'} tooltip={true} tooltipText={p}>
                <span
                    className={cn(
                        'inline-flex items-center text-zinc-300',
                        className,
                    )}
                >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                        <rect x="2" y="10" width="3" height="4" rx="0.5" />
                        <rect x="6.5" y="7" width="3" height="7" rx="0.5" />
                        <rect x="11" y="4" width="3" height="10" rx="0.5" />
                    </svg>
                </span>
            </Badge>
        );
    }

    if (p === 'medium') {
        return (
            <Badge variant={'ghost'} tooltip={true} tooltipText={p}>
                <span
                    className={cn(
                        'inline-flex items-center text-zinc-400',
                        className,
                    )}
                >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                        <rect x="2" y="10" width="3" height="4" rx="0.5" />
                        <rect x="6.5" y="7" width="3" height="7" rx="0.5" />
                        <rect
                            x="11"
                            y="4"
                            width="3"
                            height="10"
                            rx="0.5"
                            fillOpacity="0.2"
                        />
                    </svg>
                </span>
            </Badge>
        );
    }

    if (p === 'low') {
        return (
            <Badge variant={'ghost'} tooltip={true} tooltipText={p}>
                <span
                    className={cn(
                        'inline-flex items-center text-zinc-500',
                        className,
                    )}
                >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                        <rect x="2" y="10" width="3" height="4" rx="0.5" />
                        <rect
                            x="6.5"
                            y="7"
                            width="3"
                            height="7"
                            rx="0.5"
                            fillOpacity="0.2"
                        />
                        <rect
                            x="11"
                            y="4"
                            width="3"
                            height="10"
                            rx="0.5"
                            fillOpacity="0.2"
                        />
                    </svg>
                </span>
            </Badge>
        );
    }

    return (
        <Badge variant={'ghost'} tooltip={true} tooltipText={'No priority'}>
            <span
                className={cn(
                    'inline-flex items-center text-zinc-600',
                    className,
                )}
            >
                <svg
                    className="h-4 w-4 stroke-current"
                    fill="none"
                    viewBox="0 0 16 16"
                >
                    <circle
                        cx="8"
                        cy="8"
                        r="5"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                    />
                </svg>
            </span>
        </Badge>
    );
};
