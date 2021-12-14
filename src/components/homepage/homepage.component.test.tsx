import { fireEvent, render, screen } from '@testing-library/react';
import Homepage from './homepage.component';

it('should display Login component when login button clicked', () => {
    render(<Homepage />);

    expect(screen.queryByTestId('login-component')).not.toBeInTheDocument();

    const signInButton = screen.getByTestId('sign-in-button');
    fireEvent.click(signInButton);

    expect(screen.queryByTestId('login-component')).toBeInTheDocument();
});

it('should display sign up title and not sign in title', () => {
    render(<Homepage />);

    expect(screen.queryByTestId('sign-up-title')).not.toBeInTheDocument();

    const signUpButton = screen.getByTestId('sign-up-button');
    fireEvent.click(signUpButton);

    expect(screen.queryByTestId('sign-up-title')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-in-title')).not.toBeInTheDocument();
});

it('should display sign in title and not sign up title', () => {
    render(<Homepage />);

    expect(screen.queryByTestId('sign-in-title')).not.toBeInTheDocument();

    const signInButton = screen.getByTestId('sign-in-button');
    fireEvent.click(signInButton);

    expect(screen.queryByTestId('sign-in-title')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-up-title')).not.toBeInTheDocument();
});