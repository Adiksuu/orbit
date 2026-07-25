import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import IssueProperty from './IssueProperty';

describe('IssueProperty Component', () => {
    test('renders the label', () => {
        render(
            <IssueProperty label="Assignee">
                <span>Jane Doe</span>
            </IssueProperty>,
        );

        expect(screen.getByText('Assignee')).toBeInTheDocument();
    });

    test('renders its children', () => {
        render(
            <IssueProperty label="Assignee">
                <span>Jane Doe</span>
            </IssueProperty>,
        );

        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
});
