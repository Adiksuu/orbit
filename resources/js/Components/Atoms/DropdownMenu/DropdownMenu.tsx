import React from 'react';
import styles from './DropdownMenu.module.scss';

interface DropdownMenuProps {
    children: React.ReactNode;
}

export default function DropdownMenu({ children }: DropdownMenuProps) {
    return <div className={styles.menu}>{children}</div>;
}
