import { TopNavProps } from '@/types/Components';
import { cva } from 'class-variance-authority';
import React, { useState } from 'react';
import Button from '../../Atoms/Button/Button';
import Icon from '../../Atoms/Icon/Icon';
import NewIssueModal from '../NewIssueModal/NewIssueModal';

const buttonVariants = cva(
    'cursor-pointer py-2 text-sm transition-all duration-100 ease-in-out hover:text-white flex items-center justify-center gap-1',
    {
        variants: {
            isActive: {
                true: 'text-white',
                false: 'text-zinc-400',
            },
        },
    },
);

const TopNav: React.FC<TopNavProps> = ({
    selectedLook,
    setSelectedLook,
    project,
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
                            {project.name}
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
                            <Icon
                                name={'Rows3'}
                                className={
                                    selectedLook === 'List'
                                        ? 'text-white'
                                        : 'text-zinc-400'
                                }
                            />
                            List
                        </button>
                        <button
                            className={buttonVariants({
                                isActive: selectedLook === 'Board',
                            })}
                            onClick={() => setSelectedLook('Board')}
                        >
                            <Icon
                                name={'Columns3'}
                                className={
                                    selectedLook === 'Board'
                                        ? 'text-white'
                                        : 'text-zinc-400'
                                }
                            />
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
                project={project}
            />
        </>
    );
};

export default TopNav;
