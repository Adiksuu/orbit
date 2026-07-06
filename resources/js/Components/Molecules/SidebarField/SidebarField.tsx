import { SidebarFieldProps } from '@/types/Components';
import React from 'react';

const SidebarField: React.FC<SidebarFieldProps> = ({ label, children }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-gray-color)]">
                {label}
            </label>
            {children}
        </div>
    );
};

export default SidebarField;
