import Pagination from '@/Components/Molecules/Pagination/Pagination';
import CalendarView from '@/Components/Organisms/CalendarView/CalendarView';
import FilterBar from '@/Components/Organisms/FilterBar/FilterBar';
import IssueBoard from '@/Components/Organisms/IssueBoard/IssueBoard';
import IssueDetail from '@/Components/Organisms/IssueDetail/IssueDetail';
import IssueTable from '@/Components/Organisms/IssueTable/IssueTable';
import { SavedFilter } from '@/hooks/useSavedFilters';
import MainLayout from '@/Layouts/MainLayout';
import {
    Issue,
    IssuePageLooks,
    PaginatedResponse,
    Sorting,
    SortingColumn,
} from '@/types/Issues';
import { Project } from '@/types/Projects';
import { useEffect, useState } from 'react';

interface QueryParams {
    sort?: SortingColumn;
    direction?: Sorting;
    page?: string;
    [key: string]: any;
}

export default function Show({
    project,
    issues,
    projects,
    queryParams = {},
    savedFilters,
}: {
    project: Project;
    issues: PaginatedResponse<Issue>;
    projects: Project[];
    queryParams?: QueryParams;
    savedFilters: SavedFilter[];
}) {
    const [activeIssue, _setActiveIssue] = useState<Issue | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const setActiveIssue = (issue: Issue | null, edit: boolean = false) => {
        _setActiveIssue(issue);
        setIsEditing(edit);
    };

    const [selectedLook, setSelectedLook] = useState<IssuePageLooks>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('selectedLook');
            if (saved === 'List' || saved === 'Board' || saved === 'Calendar') {
                return saved;
            }
        }
        return 'List';
    });

    useEffect(() => {
        localStorage.setItem('selectedLook', selectedLook);
    }, [selectedLook]);

    useEffect(() => {
        if (activeIssue) {
            const updated = issues.data.find((i) => i.id === activeIssue.id);
            if (updated) {
                setActiveIssue(updated);
            }
        }
    }, [issues]);

    return (
        <MainLayout
            selectedLook={selectedLook}
            setSelectedLook={setSelectedLook}
            projects={projects}
            project={project}
        >
            <div className={'flex h-full flex-col'}>
                <FilterBar
                    queryParams={queryParams}
                    project={project}
                    savedFilters={savedFilters}
                />
                <div
                    className={
                        'relative flex flex-1 overflow-hidden border-t border-solid border-[var(--bg-light-color)]'
                    }
                >
                    <div className={'flex flex-1 flex-col overflow-hidden'}>
                        {selectedLook === 'List' ? (
                            <IssueTable
                                issues={issues.data}
                                activeIssue={activeIssue}
                                setActiveIssue={setActiveIssue}
                                queryParams={queryParams}
                                project={project}
                                pagination={
                                    <Pagination
                                        links={issues.links}
                                        from={issues.from}
                                        to={issues.to}
                                        total={issues.total}
                                        queryParams={queryParams}
                                    />
                                }
                            />
                        ) : selectedLook === 'Board' ? (
                            <>
                                <div
                                    className={
                                        'flex flex-1 flex-row overflow-hidden'
                                    }
                                >
                                    <IssueBoard
                                        issues={issues.data}
                                        activeIssue={activeIssue}
                                        setActiveIssue={setActiveIssue}
                                    />
                                </div>
                                <Pagination
                                    links={issues.links}
                                    from={issues.from}
                                    to={issues.to}
                                    total={issues.total}
                                    queryParams={queryParams}
                                />
                            </>
                        ) : (
                            <CalendarView
                                issues={issues.data}
                                activeIssue={activeIssue}
                                setActiveIssue={setActiveIssue}
                            />
                        )}
                    </div>
                    {activeIssue && (
                        <IssueDetail
                            isOpen={!!activeIssue}
                            onClose={() => setActiveIssue(null)}
                            activeIssue={activeIssue}
                            initialIsEditing={isEditing}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
