import { ModalContent, ModalContextType } from '@/types/Modal';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalContent[]>([]);

    const openModal = useCallback(
        (
            title: string,
            description: string | undefined,
            children: ReactNode,
        ) => {
            const id = Math.random().toString(36).substring(2, 9);

            setModals((prev) => [
                ...prev,
                { id, title, description, children },
            ]);

            return id;
        },
        [],
    );

    const closeModal = useCallback((id: string) => {
        setModals((prev) => prev.filter((modal) => modal.id !== id));
    }, []);

    const closeAllModals = useCallback(() => {
        setModals([]);
    }, []);

    return (
        <ModalContext.Provider
            value={{ modals, openModal, closeModal, closeAllModals }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
