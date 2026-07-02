import IssueBoard from '@/Components/Organisms/IssueBoard/IssueBoard';
import { Issue, IssuePageLooks, PaginatedResponse } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { useEffect, useState } from 'react';
import Pagination from '../Components/Molecules/Pagination/Pagination';
import FilterBar from '../Components/Organisms/FilterBar/FilterBar';
import IssueDetail from '../Components/Organisms/IssueDetail/IssueDetail';
import IssueTable from '../Components/Organisms/IssueTable/IssueTable';
import MainLayout from '../Layouts/MainLayout';

export default function Dashboard({
    issues,
    projects,
}: {
    issues: PaginatedResponse<Issue>;
    projects: Project[];
}) {
    console.log('Issues:', issues);
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
    const [selectedLook, setSelectedLook] = useState<IssuePageLooks>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('selectedLook');
            if (saved === 'List' || saved === 'Board') {
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
        >
            <div className={'flex h-full flex-col'}>
                <FilterBar />
                <div
                    className={
                        'flex flex-1 overflow-hidden border-t border-solid border-[var(--bg-light-color)]'
                    }
                >
                    <div
                        className={
                            'flex flex-1 flex-col overflow-hidden border-r border-solid border-[var(--bg-light-color)]'
                        }
                    >
                        {selectedLook === 'List' ? (
                            <>
                                <div className={'flex-1 overflow-y-auto'}>
                                    <IssueTable
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
                                />
                            </>
                        ) : (
                            <>
                                <div
                                    className={
                                        'flex flex-1 flex-row overflow-y-auto'
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
                                />
                            </>
                        )}
                    </div>
                    {activeIssue && (
                        <div
                            className={
                                'w-[420px] overflow-y-auto bg-[var(--bg-color)]'
                            }
                        >
                            <IssueDetail
                                activeIssue={activeIssue}
                                setActiveIssue={setActiveIssue}
                            />
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
