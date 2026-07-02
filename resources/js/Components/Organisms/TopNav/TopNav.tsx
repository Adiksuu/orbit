import { cva } from 'class-variance-authority';
import React from 'react';
import Button from '../../Atoms/Button/Button';
import Icon from '../../Atoms/Icon/Icon';

const buttonVariants = cva(
    'cursor-pointer border-none bg-transparent py-2 text-sm text-zinc-400 transition-all duration-100 ease-in-out hover:text-white',
    {
        variants: {
            isActive: {
                true: 'text-white border-b-1 border-solid border-[var(--accent-color)]',
                false: '',
            },
        },
    },
);

const TopNav: React.FC = () => {
    return (
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
                    <button className={buttonVariants({ isActive: true })}>
                        Issues
                    </button>
                    <button className={buttonVariants({ isActive: true })}>
                        Board
                    </button>
                    <button className={buttonVariants({ isActive: true })}>
                        Roadmap
                    </button>
                    <button className={buttonVariants({ isActive: true })}>
                        Sprints
                    </button>
                    <button className={buttonVariants({ isActive: true })}>
                        Reports
                    </button>
                    <button className={buttonVariants({ isActive: true })}>
                        Settings
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
                        <Button>
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
    );
};

export default TopNav;
