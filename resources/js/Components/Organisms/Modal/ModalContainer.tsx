import { useModal } from '@/context/ModalContext';
import { AnimatePresence } from 'framer-motion';
import { ModalOrg } from './Modal';

export const ModalContainer = () => {
    const { modals, closeModal } = useModal();

    return (
        <AnimatePresence>
            {modals.map((modal) => (
                <ModalOrg key={modal.id} modal={modal} onClose={closeModal} />
            ))}
        </AnimatePresence>
    );
};
