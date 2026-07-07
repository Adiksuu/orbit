import Icon from '@/Components/Atoms/Icon/Icon';
import { PageHeaderProps } from '@/types/Components';
import { formattedDate } from '@/utils/time';

function PageHeader({ title, children }: PageHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-solid border-[var(--bg-light-color)] bg-[var(--bg-color)] px-6">
            <div className="flex flex-col">
                <h1 className="text-sm font-semibold text-white">{title}</h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    {formattedDate()}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button className="flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]">
                    <Icon name="Bell" size={16} color="#999" />
                </button>
                <button className="flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]">
                    <Icon name="Settings" size={16} color="#999" />
                </button>

                {children}
            </div>
        </header>
    );
}

export default PageHeader;
