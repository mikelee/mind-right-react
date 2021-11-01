import React from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import './login.styles.scss';

interface Props {
    type: string | null
}

const Login: React.FC<Props> = ({ type }) => {

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
    }

    const signIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    
    return (
        <div className='login' data-testid='login-component'>
            {
                type === 'sign-up'
                ? <p className='title' data-testid='sign-up-title'>Sign Up</p>
                : <p className='title' data-testid='sign-in-title'>Login</p>
            }

            <form onSubmit={type === 'sign-up' ? signUp : signIn}>
                <input name='email' type='text' placeholder='email' required />
                <input name='password' type='password' placeholder='password' required />
                <button type='submit'>{ type === 'sign-up' ? 'Sign Up' : 'Sign In'}</button>
            </form>
        </div>
)};

export default Login;