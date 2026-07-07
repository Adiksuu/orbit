import Icon from '@/Components/Atoms/Icon/Icon';

function IssueTableEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="mb-6 rounded-full border border-zinc-700/50 bg-[var(--bg-light-color)] p-4 shadow-inner">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-xl">
                    <Icon
                        name="Check"
                        size={36}
                        className="text-zinc-400 opacity-90"
                    />
                </div>
            </div>

            <div className="mx-auto max-w-md">
                <h4 className="text-xl font-bold tracking-tight text-white">
                    All caught up!
                </h4>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
                    No issues found in this view. Everything is completed or no
                    tasks have been assigned yet.
                </p>
            </div>
        </div>
    );
}

export default IssueTableEmptyState;
