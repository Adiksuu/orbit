import IconButton from '@/Components/Atoms/IconButton/IconButton';
import Modal from '@/Components/Atoms/Modal/Modal';
import { ModalContent } from '@/types/Modal';

interface ModalOrgProps {
    modal: ModalContent;
    onClose: (id: string) => void;
}

export const ModalOrg = ({ modal, onClose }: ModalOrgProps) => {
    return (
        <Modal isOpen={true} onClose={() => onClose(modal.id)} size="md">
            <div className="flex h-full flex-col">
                <div className="flex items-start justify-between p-6">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-[var(--text-color)]">
                            {modal.title}
                        </h2>
                        {modal.description && (
                            <p className="mt-1 text-sm text-zinc-400">
                                {modal.description}
                            </p>
                        )}
                    </div>
                    <IconButton
                        iconName={'X'}
                        onClick={() => onClose(modal.id)}
                        iconSize={20}
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {modal.children}
                </div>
            </div>
        </Modal>
    );
};
