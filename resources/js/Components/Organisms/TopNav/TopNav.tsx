import { IssuePageLooks } from '@/types/Issues';
import { Project } from '@/types/Projects';
import { cva } from 'class-variance-authority';
import React, { useState } from 'react';
import Button from '../../Atoms/Button/Button';
import Icon from '../../Atoms/Icon/Icon';
import NewIssueModal from '../NewIssueModal/NewIssueModal';

const buttonVariants = cva(
    'cursor-pointer py-2 text-sm transition-all duration-100 ease-in-out hover:text-white',
    {
        variants: {
            isActive: {
                true: 'text-white',
                false: 'text-zinc-400',
            },
        },
    },
);

interface TopNavProps {
    selectedLook: IssuePageLooks;
    setSelectedLook: (look: IssuePageLooks) => void;
    projects: Project[];
}

const TopNav: React.FC<TopNavProps> = ({
    selectedLook,
    setSelectedLook,
    projects,
}) => {
    const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

    return (
        <>
            <header
                className={
                    'flex h-auto items-center justify-between border-b border-solid border-[var(--bg-light-color)] bg-[var(--bg-color)] px-6 pt-4'
                }
            >
                <div className={'flex h-full flex-col justify-center gap-4'}>
                    <div className={'flex items-center gap-2'}>
                        <h1 className={'m-0 text-sm font-semibold text-white'}>
                            Mobile App
                        </h1>
                        <Icon name="Star" size={16} color="#999" />
                    </div>
                    <nav className={'flex gap-6'}>
                        <button
                            className={buttonVariants({
                                isActive: selectedLook === 'List',
                            })}
                            onClick={() => setSelectedLook('List')}
                        >
                            List
                        </button>
                        <button
                            className={buttonVariants({
                                isActive: selectedLook === 'Board',
                            })}
                            onClick={() => setSelectedLook('Board')}
                        >
                            Board
                        </button>
                    </nav>
                </div>
                <div className={'flex items-center'}>
                    <div className={'flex items-center gap-4'}>
                        <div
                            className={
                                'flex items-stretch overflow-hidden rounded-md bg-[var(--accent-color)]'
                            }
                        >
                            <Button
                                onClick={() => setIsNewIssueModalOpen(true)}
                            >
                                New issue <Icon name={'Plus'} />
                            </Button>
                        </div>
                        <button
                            className={
                                'flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]'
                            }
                        >
                            <Icon name="Search" size={18} color="#999" />
                        </button>
                        <button
                            className={
                                'flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]'
                            }
                        >
                            <Icon name="Bell" size={18} color="#999" />
                        </button>
                        <button
                            className={
                                'flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1.5 hover:bg-[var(--bg-light-color)]'
                            }
                        >
                            <Icon
                                name="CircleQuestionMark"
                                size={18}
                                color="#999"
                            />
                        </button>
                    </div>
                </div>
            </header>
            <NewIssueModal
                isOpen={isNewIssueModalOpen}
                onClose={() => setIsNewIssueModalOpen(false)}
                projects={projects}
            />
        </>
    );
};

export default TopNav;
