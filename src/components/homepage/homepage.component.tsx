import React, { useState } from 'react';

import './homepage.styles.scss';

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
                <button className='button' name='sign-up' onClick={e => toggleLogin(e)}>Sign Up</button>
                <button className='button' name='sign-in' onClick={e => toggleLogin(e)}>Sign In</button>
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