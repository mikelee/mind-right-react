import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addNewUser, auth } from '../../firebase';
import useWindowSize from '../../hooks/useWindowSize';

import './login.styles.scss';
import {ReactComponent as CloseIcon} from '../../assets/delete.svg';

import Button from '../button/button.component';

interface Props {
    type: string | null,
    toggleLogin: (e: React.MouseEvent<HTMLButtonElement> | null) => void
}

const Login: React.FC<Props> = ({ type, toggleLogin }) => {

    let navigate = useNavigate();
    const windowSize = useWindowSize();
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const userData = {
                email: user.email,
                uid: user.uid
            }

            try {
                await addNewUser(userData);
                navigate('/home');
            } catch (error) {
                console.log(error)
            }

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const errorText = convertErrorMessage(errorCode);

            setErrorMessage(errorText);
            
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
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
            navigate('/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const errorText = convertErrorMessage(errorCode);

            setErrorMessage(errorText);

            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        });
    }

    const convertErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'This email isn\'t associated with an account';
            case 'auth/email-already-in-use':
                return 'This email is already in use';
            case 'auth/invalid-email':
                return 'Invalid email';
            case 'auth/wrong-password':
                return 'Incorrect email or password';
            case 'auth/weak-password':
                return 'Password must be at least 6 characters';
            default:
                return errorCode;
        }
    }
    
    return (
        <section className='login' data-testid='login-component' style={ windowSize.width <= 480 ? { height:  windowSize.height + 'px'} : {}}>
            {
                type === 'sign-up'
                ? <h2 className='title' data-testid='sign-up-title'>Sign Up</h2>
                : <h2 className='title' data-testid='sign-in-title'>Sign In</h2>
            }

            <form onSubmit={type === 'sign-up' ? signUp : signIn}>
                <input name='email' type='text' placeholder='email' autoFocus required />
                <input name='password' type='password' placeholder='password' required />
                <Button text={type === 'sign-up' ? 'Sign Up' : 'Sign In'} type='submit' />
            </form>
            {
                errorMessage
                ? <p className='error-message'>{errorMessage}</p>
                : null
            }
            <button className='close' onClick={() => toggleLogin(null)}>
                <CloseIcon className='close-icon' />
            </button>
        </section>
    );
}

export default Login;