import { Link } from '@inertiajs/react';
import Icon from '../../Atoms/Icon/Icon';
import styles from './Pagination.module.scss';

interface PaginationProps {
    links: Array<{ url: string | null; label: string; active: boolean }>;
    from: number;
    to: number;
    total: number;
}

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
        <div className={styles.paginationContainer}>
            <div className={styles.info}>
                Showing <span>{from || 0}</span> to <span>{to || 0}</span> of{' '}
                <span>{total}</span> results
            </div>
            {links && links.length > 3 && (
                <div className={styles.links}>
                    {links.map((link, index) => {
                        if (!link.url) {
                            return (
                                <span
                                    key={index}
                                    className={`${styles.link} ${styles.disabled}`}
                                >
                                    {renderLabel(link.label)}
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={link.url}
                                className={`${styles.link} ${link.active ? styles.active : ''}`}
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
