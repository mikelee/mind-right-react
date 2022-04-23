import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addNewUser, auth } from '../../firebase';

import './login.styles.scss';

import Button from '../button/button.component';

interface Props {
    type: string | null
}

const Login: React.FC<Props> = ({ type }) => {

    let navigate = useNavigate();
    
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
            
            setErrorMessage(errorCode);

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

            setErrorMessage(errorCode);

            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        });
    }
    
    return (
        <div className='login' data-testid='login-component'>
            {
                type === 'sign-up'
                ? <p className='title' data-testid='sign-up-title'>Sign Up</p>
                : <p className='title' data-testid='sign-in-title'>Sign In</p>
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
        </div>
)};

export default Login;