import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './nav.styles.scss';

const Nav = () => {

    const logout = () => {
        signOut(auth)
        .then(() => {
            console.log('logged out')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className='nav'>
            <button className='logout-button' onClick={logout}>Log Out</button>
        </div>
    );
}

export default Nav;