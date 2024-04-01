import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Homepage from './homepage.component';

beforeEach(() => {
    render(
        <MemoryRouter>
            <Homepage />
        </MemoryRouter>
    );
});

it('should display Login component when login button clicked', () => {
    expect(screen.queryByTestId('login-component')).not.toBeInTheDocument();

    const signInButton = screen.getByTestId('sign-in-button');
    act(() => {
        userEvent.click(signInButton);
    });

    expect(screen.queryByTestId('login-component')).toBeInTheDocument();
});

it('should display sign up title and not sign in title', () => {
    expect(screen.queryByTestId('sign-up-title')).not.toBeInTheDocument();

    const signUpButton = screen.getByTestId('sign-up-button');
    act(() => {
        userEvent.click(signUpButton);
    });

    expect(screen.queryByTestId('sign-up-title')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-in-title')).not.toBeInTheDocument();
});

it('should display sign in title and not sign up title', () => {
    expect(screen.queryByTestId('sign-in-title')).not.toBeInTheDocument();

    const signInButton = screen.getByTestId('sign-in-button');
    act(() => {
        userEvent.click(signInButton);
    });

    expect(screen.queryByTestId('sign-in-title')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-up-title')).not.toBeInTheDocument();
});