import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, expect, test } from 'vitest';
import { ModalProvider, useModal } from './ModalContext';

const wrapper = ({ children }: { children: ReactNode }) => (
    <ModalProvider>{children}</ModalProvider>
);

describe('useModal', () => {
    test('throws when used outside of a ModalProvider', () => {
        expect(() => renderHook(() => useModal())).toThrow(
            'useModal must be used within a ModalProvider',
        );
    });

    test('starts with no modals open', () => {
        const { result } = renderHook(() => useModal(), { wrapper });

        expect(result.current.modals).toEqual([]);
        expect(result.current.getIfAnyModalIsOpened()).toBe(false);
    });

    test('openModal adds a modal and returns its id', () => {
        const { result } = renderHook(() => useModal(), { wrapper });

        let id = '';
        act(() => {
            id = result.current.openModal('Title', 'Description', <div />);
        });

        expect(id).not.toBe('');
        expect(result.current.modals).toHaveLength(1);
        expect(result.current.modals[0]).toMatchObject({
            id,
            title: 'Title',
            description: 'Description',
        });
        expect(result.current.getIfAnyModalIsOpened()).toBe(true);
    });

    test('closeModal removes only the matching modal', () => {
        const { result } = renderHook(() => useModal(), { wrapper });

        let firstId = '';
        act(() => {
            firstId = result.current.openModal('First', undefined, <div />);
            result.current.openModal('Second', undefined, <div />);
        });

        act(() => {
            result.current.closeModal(firstId);
        });

        expect(result.current.modals).toHaveLength(1);
        expect(result.current.modals[0].title).toBe('Second');
    });

    test('closeAllModals clears modals and external modals', () => {
        const { result } = renderHook(() => useModal(), { wrapper });

        act(() => {
            result.current.openModal('First', undefined, <div />);
            result.current.registerExternalModal('external-1');
        });
        expect(result.current.getIfAnyModalIsOpened()).toBe(true);

        act(() => {
            result.current.closeAllModals();
        });

        expect(result.current.modals).toEqual([]);
        expect(result.current.getIfAnyModalIsOpened()).toBe(false);
    });

    test('registerExternalModal is idempotent and marks a modal as opened', () => {
        const { result } = renderHook(() => useModal(), { wrapper });

        act(() => {
            result.current.registerExternalModal('external-1');
            result.current.registerExternalModal('external-1');
        });

        expect(result.current.getIfAnyModalIsOpened()).toBe(true);
    });

    test('unregisterExternalModal is a no-op for an id that was never registered', () => {
        const { result } = renderHook(() => useModal(), { wrapper });

        act(() => {
            result.current.unregisterExternalModal('never-registered');
        });

        expect(result.current.getIfAnyModalIsOpened()).toBe(false);
    });

    test('unregisterExternalModal removes only the matching id', () => {
        const { result } = renderHook(() => useModal(), { wrapper });

        act(() => {
            result.current.registerExternalModal('external-1');
            result.current.registerExternalModal('external-2');
        });

        act(() => {
            result.current.unregisterExternalModal('external-1');
        });

        expect(result.current.getIfAnyModalIsOpened()).toBe(true);

        act(() => {
            result.current.unregisterExternalModal('external-2');
        });

        expect(result.current.getIfAnyModalIsOpened()).toBe(false);
    });
});
