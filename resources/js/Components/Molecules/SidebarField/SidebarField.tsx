import React from 'react';

interface SidebarFieldProps {
    label: string;
    children: React.ReactNode;
}

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
