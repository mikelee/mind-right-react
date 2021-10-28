import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import './login.styles.scss';

interface Props {
    type: string | null
}

const Login: React.FC<Props> = ({ type }) => {

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = (e.target as HTMLFormElement).username.value;
        const password = (e.target as HTMLFormElement).password.value;

        createUserWithEmailAndPassword(auth, username, password)
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
        <div className='login'>
            {
                type === 'sign-up'
                ?
                    <>
                        <p className='title'>Sign Up</p>

                        <form onSubmit={signUp}>
                            <input name='username' type='text' placeholder='username' required />
                            <input name='password' type='password' placeholder='password' required />
                            <button type='submit'>Sign Up</button>
                        </form>
                    </>
                :
                    <>
                        <p className='title'>Login</p>
                    </>
            }
        </div>
)};

export default Login;