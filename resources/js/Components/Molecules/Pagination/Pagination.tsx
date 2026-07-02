import { Link } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import Icon from '../../Atoms/Icon/Icon';

interface PaginationProps {
    links: Array<{ url: string | null; label: string; active: boolean }>;
    from: number;
    to: number;
    total: number;
}

const paginationVariants = cva(
    'flex items-center justify-center min-w-[32px] h-[32px] px-2 rounded-md text-sm text-white no-underline transition-all duration-100 ease-in-out border border-solid border-transparent cursor-pointer',
    {
        variants: {
            active: {
                true: 'bg-[var(--accent-color)] text-white font-medium',
                false: 'hover:bg-[var(--accent-color)]/10 hover:border-[var(--accent-color)]/20 hover:text-[var(--accent-color)]',
            },
            disabled: {
                true: 'text-zinc-400 cursor-not-allowed opacity-40 pointer-events-none',
                false: '',
            },
        },
        defaultVariants: {
            active: false,
            disabled: false,
        },
    },
);

const Pagination = ({ links, from, to, total }: PaginationProps) => {
    if (total === 0) return null;

    const renderLabel = (label: string) => {
        if (label.includes('Previous')) {
            return <Icon name="ChevronLeft" size={16} />;
        }
        if (label.includes('Next')) {
            return <Icon name="ChevronRight" size={16} />;
        }
        return label;
    };

    return (
        <div className="mt-auto flex items-center justify-between border-t border-solid border-t-[var(--bg-light-color)] bg-[var(--bg-color)] px-6 py-4">
            <div className="text-sm text-zinc-400">
                Showing{' '}
                <span className="font-semibold text-white">{from || 0}</span> to{' '}
                <span className="font-semibold text-white">{to || 0}</span> of{' '}
                <span className="font-semibold text-white">{total}</span>{' '}
                results
            </div>
            {links && links.length > 3 && (
                <div className="flex items-center gap-2">
                    {links.map((link, index) => {
                        const isLinkDisabled = !link.url;

                        if (isLinkDisabled) {
                            return (
                                <span
                                    key={index}
                                    className={paginationVariants({
                                        active: link.active,
                                        disabled: true,
                                    })}
                                >
                                    {renderLabel(link.label)}
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={link.url!}
                                className={paginationVariants({
                                    active: link.active,
                                    disabled: false,
                                })}
                            >
                                {renderLabel(link.label)}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Pagination;
