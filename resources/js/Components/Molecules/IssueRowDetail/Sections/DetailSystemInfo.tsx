import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { DetailSystemInfoProps } from '@/types/Components';
import { formatTimeAgo } from '@/utils/time';
import { InfoItem } from '../InfoItem';

export const DetailSystemInfo = ({ issue }: DetailSystemInfoProps) => (
    <section className="space-y-5">
        <h4 className="border-b border-zinc-800 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500/80">
            System Info
        </h4>
        <div className="grid grid-cols-1 gap-y-5">
            <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Created">
                    <span className="text-xs text-zinc-400">
                        {issue.created_at
                            ? formatTimeAgo(issue.created_at)
                            : 'N/A'}
                    </span>
                </InfoItem>
                <InfoItem label="Updated">
                    <span className="text-xs text-zinc-400">
                        {issue.updated_at
                            ? formatTimeAgo(issue.updated_at)
                            : 'N/A'}
                    </span>
                </InfoItem>
            </div>
            <InfoItem label="Creator">
                <UserBadge
                    avatarSrc={issue.creator?.avatar}
                    name={issue.creator?.name ?? 'Unknown'}
                    size="sm"
                />
            </InfoItem>
            <InfoItem label="Milestone">
                <span className="text-xs italic text-zinc-400">
                    {issue.milestone || 'Not scheduled'}
                </span>
            </InfoItem>
        </div>
    </section>
);
