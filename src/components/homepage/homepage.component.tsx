import React, { useState } from 'react';

import './homepage.styles.scss';

import Button from '../button/button.component';
import Login from '../login/login.component';

const Homepage: React.FC = () => {

    const [loginType, setloginType] = useState<string | null>(null);

    const toggleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        const type = (e.target as HTMLButtonElement).getAttribute('name');
        
        setloginType(type);
    }

    return (
        <div className='homepage'>
            <h1 className='name'>MindRight</h1>
            <div className='buttons'>
                <Button text='Sign Up' onClick={e => toggleLogin(e)} name='sign-up' dataTestId='sign-up-button' />
                <Button text='Sign In' onClick={e => toggleLogin(e)} name='sign-in' dataTestId='sign-in-button' />
            </div>

            <div className='tile tile-center'></div>
            <div className='tile tile-top-left'></div>
            <div className='tile tile-top-middle'></div>
            <div className='tile tile-bottom-left'></div>
            <div className='tile tile-bottom-right'></div>

            {
                loginType
                ? 
                    <>
                        <Login type={loginType}/>
                        <div className='overlay'></div>
                    </>
                : null
            }
        </div>
    );
};

export default Homepage;