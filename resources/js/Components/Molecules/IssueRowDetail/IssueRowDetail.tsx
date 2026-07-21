import { IssueRowDetailProps } from '@/types/Components';
import { DetailAttributes } from './Sections/DetailAttributes';
import { DetailDescription } from './Sections/DetailDescription';
import { DetailSystemInfo } from './Sections/DetailSystemInfo';

export const IssueRowDetail = ({
    issue,
    onOpenDetails,
}: IssueRowDetailProps) => {
    return (
        <div className="flex w-full flex-col gap-8 p-8 pl-14">
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-3">
                <DetailDescription
                    issue={issue}
                    onOpenDetails={onOpenDetails}
                />
                <DetailAttributes issue={issue} />
                <DetailSystemInfo issue={issue} />
            </div>
        </div>
    );
};

export default IssueRowDetail;
