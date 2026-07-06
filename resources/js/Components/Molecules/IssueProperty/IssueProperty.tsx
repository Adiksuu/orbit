import { IssuePropertyProps } from '@/types/Components';

const IssueProperty = ({ label, children }: IssuePropertyProps) => {
    return (
        <div className="grid min-h-[36px] grid-cols-[100px_1fr] items-center">
            <span className="text-sm text-zinc-400">{label}</span>
            <div className="relative flex items-center gap-2.5 text-sm text-white">
                {children}
            </div>
        </div>
    );
};

export default IssueProperty;
