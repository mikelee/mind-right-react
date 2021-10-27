import React, { useState } from 'react';

import './homepage.styles.scss';

import Login from '../login/login.component';

const Homepage: React.FC = () => {

    const [loginVisible, setLoginVisible] = useState<string | null>(null);

    const toggleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        const type = (e.target as HTMLButtonElement).getAttribute('name');
        
        setLoginVisible(type);
    }

    return (
        <div className='homepage'>
            <h1 className='name'>MindRight</h1>
            <div className='buttons'>
                <button className='button' name='sign-up' onClick={e => toggleLogin(e)}>Sign Up</button>
                <button className='button' name='login' onClick={e => toggleLogin(e)}>Log In</button>
            </div>

            <div className='tile tile-center'></div>
            <div className='tile tile-top-left'></div>
            <div className='tile tile-top-middle'></div>
            <div className='tile tile-bottom-left'></div>
            <div className='tile tile-bottom-right'></div>

            {
                loginVisible
                ? <Login type={loginVisible}/>
                : null
            }
        </div>
    );
};

export default Homepage;