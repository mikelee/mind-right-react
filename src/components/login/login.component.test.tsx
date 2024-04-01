import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Login from './login.component';

it('should display sign up button', () => {
    render(
        <MemoryRouter>
            <Login type='sign-up'toggleLogin={jest.fn()}/>
        </MemoryRouter>
    );

    const signUpButton = screen.getByRole('button', {
        name: 'Sign Up'
    });

    expect(signUpButton).toBeInTheDocument();
});

it('should display sign in button', () => {
    render(
        <MemoryRouter>
            <Login type='sign-in' toggleLogin={jest.fn()}/>
        </MemoryRouter>
    );

    const signInButton = screen.getByRole('button', {
        name: 'Sign In'
    })

    expect(signInButton).toBeInTheDocument();
});
