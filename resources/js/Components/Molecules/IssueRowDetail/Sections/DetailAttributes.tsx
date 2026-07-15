import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import LabelList from '@/Components/Molecules/LabelList/LabelList';
import UserBadge from '@/Components/Molecules/UserBadge/UserBadge';
import { DetailAttributesProps } from '@/types/Components';
import { cn } from '@/utils/cn';
import { priorityTextColor } from '@/utils/variants';
import { InfoItem } from '../InfoItem';

export const DetailAttributes = ({ issue }: DetailAttributesProps) => (
    <section className="space-y-5">
        <h4 className="border-b border-zinc-800 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500/80">
            Attributes
        </h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <InfoItem label="Status">
                <div className="flex items-center gap-2 text-zinc-200">
                    <StatusDot status={issue.status} />
                    <span className="capitalize">{issue.status}</span>
                </div>
            </InfoItem>
            <InfoItem label="Priority">
                <div className="flex items-center gap-2">
                    <StatusDot status={issue.priority} />
                    <span
                        className={cn(
                            'capitalize',
                            priorityTextColor({ priority: issue.priority }),
                        )}
                    >
                        {issue.priority}
                    </span>
                </div>
            </InfoItem>
            <InfoItem label="Assignee">
                <UserBadge
                    avatarSrc={issue.assignee?.avatar}
                    name={issue.assignee?.name ?? 'Unassigned'}
                    size="sm"
                />
            </InfoItem>
            <InfoItem label="Reporter">
                <UserBadge
                    avatarSrc={issue.reporter?.avatar}
                    name={issue.reporter?.name ?? 'Unknown'}
                    size="sm"
                />
            </InfoItem>
            <div className="col-span-2">
                <InfoItem label="Labels">
                    {issue.labels && issue.labels.length > 0 ? (
                        <LabelList
                            labels={issue.labels}
                            badgeClassName="text-[10px] px-2 py-0.5"
                        />
                    ) : (
                        <span className="text-xs text-zinc-600">No labels</span>
                    )}
                </InfoItem>
            </div>
        </div>
    </section>
);
