import React, { useState } from 'react';

import './homepage.styles.scss';

import Button from '../button/button.component';
import Login from '../login/login.component';

interface Props {
    loggedOut?: boolean
}

const Homepage: React.FC<Props> = ({ loggedOut }) => {

    const [loginType, setloginType] = useState<string | null>(null);

    const toggleLogin = (e: React.MouseEvent<HTMLButtonElement> | null) => {
        if (e) {
            const type = (e.target as HTMLButtonElement).getAttribute('name');
            setloginType(type);
        } else {
            setloginType(null)
        }
        
    }

    return (
        <div className='homepage'>
            <main>
                <h1 className='name'>MindRight</h1>
                <div className='buttons'>
                    <Button text='Sign Up' onClick={e => toggleLogin(e)} name='sign-up' dataTestId='sign-up-button' />
                    <Button text='Sign In' onClick={e => toggleLogin(e)} name='sign-in' dataTestId='sign-in-button' />
                </div>
                {
                    loginType
                    ? 
                        <>
                            <Login type={loginType}/>
                            <div className='overlay' onClick={() => toggleLogin(null)} ></div>
                        </>
                    : null
                }
                {
                    loggedOut
                    ? <p className='logged-out-message'>You have successfully logged out</p>
                    : null
                }
            </main>
            <div className='tile tile-center'></div>
            <div className='tile tile-top-left'></div>
            <div className='tile tile-top-middle'></div>
            <div className='tile tile-bottom-left'></div>
            <div className='tile tile-bottom-right'></div>
        </div>
    );
};

export default Homepage;