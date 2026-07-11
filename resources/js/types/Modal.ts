import { ReactNode } from 'react';

export interface ModalContent {
    id: string;
    title: string;
    description?: string;
    children: ReactNode;
}

export interface ModalContextType {
    modals: ModalContent[];
    openModal: (
        title: string,
        description: string | undefined,
        children: ReactNode,
    ) => string;
    closeModal: (id: string) => void;
    closeAllModals: () => void;
}
