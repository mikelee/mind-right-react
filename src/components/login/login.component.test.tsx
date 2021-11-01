import { render, screen } from "@testing-library/react";
import Login from './login.component';

it('should display sign up button', () => {
    render(<Login type='sign-up'/>);

    const signUpButton = screen.getByRole('button', {
        name: 'Sign Up'
    });

    expect(signUpButton).toBeInTheDocument();
});

it('should display sign in button', () => {
    render(<Login type='sign-in'/>);

    const signInButton = screen.getByRole('button', {
        name: 'Sign In'
    })

    expect(signInButton).toBeInTheDocument();
});
