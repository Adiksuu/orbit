import { InfoItemProps } from '@/types/Components';

export const InfoItem = ({ label, children }: InfoItemProps) => (
    <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500/80">
            {label}
        </span>
        <div className="text-[13px] text-zinc-200">{children}</div>
    </div>
);
