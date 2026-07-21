import IconButton from '@/Components/Atoms/IconButton/IconButton';
import { DetailDescriptionProps } from '@/types/Components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { InfoItem } from '../InfoItem';

export const DetailDescription = ({
    issue,
    onOpenDetails,
}: DetailDescriptionProps) => {
    const truncateDescription = (text?: string) => {
        if (!text) return null;
        if (text.length <= 100) return text;
        return text.substring(0, 100) + '...';
    };

    const truncatedContent = truncateDescription(issue.description);

    return (
        <section className="space-y-5">
            <h4 className="border-b border-zinc-800 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500/80">
                Issue Details
            </h4>
            <div className="grid grid-cols-1 gap-y-5">
                <InfoItem label="Description">
                    <div className="prose-xs prose prose-invert max-w-2xl text-[13px] leading-relaxed text-zinc-300 prose-p:leading-relaxed prose-pre:bg-zinc-900/50">
                        {truncatedContent ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {truncatedContent}
                            </ReactMarkdown>
                        ) : (
                            <span className="italic text-zinc-600">
                                No description provided.
                            </span>
                        )}
                    </div>
                </InfoItem>
                <div className="pt-2">
                    <IconButton
                        iconName="Maximize"
                        onClick={onOpenDetails}
                        className="flex items-center gap-2 rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-2 text-[11px] font-bold text-zinc-300 transition-all hover:bg-zinc-700/50 hover:text-white"
                    >
                        Open Modal View
                    </IconButton>
                </div>
            </div>
        </section>
    );
};
