import React from 'react';
import Button from '../../Atoms/Button/Button';
import Icon from '../../Atoms/Icon/Icon';
import styles from './TopNav.module.scss';

const TopNav: React.FC = () => {
    return (
        <header className={styles.topNav}>
            <div className={styles.left}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Mobile App</h1>
                    <Icon name="Star" size={16} color="#999" />
                </div>
                <nav className={styles.tabs}>
                    <button className={styles.tabActive}>Issues</button>
                    <button className={styles.tab}>Board</button>
                    <button className={styles.tab}>Roadmap</button>
                    <button className={styles.tab}>Sprints</button>
                    <button className={styles.tab}>Reports</button>
                    <button className={styles.tab}>Settings</button>
                </nav>
            </div>
            <div className={styles.right}>
                <div className={styles.actions}>
                    <div className={styles.newIssueGroup}>
                        <Button>New issue</Button>
                        <button className={styles.dropdownBtn}>
                            <Icon
                                name="ChevronDown"
                                size={14}
                                color="#f3f3f3"
                            />
                        </button>
                    </div>
                    <button className={styles.iconAction}>
                        <Icon name="Search" size={18} color="#999" />
                    </button>
                    <button className={styles.iconAction}>
                        <Icon name="Bell" size={18} color="#999" />
                    </button>
                    <button className={styles.iconAction}>
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
