import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './menu.styles.scss';

const Menu = () => {
    
    const logout = () => {
        signOut(auth)
        .then(() => {
            console.log('logged out')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className='menu'>
            <button className='logout-button' onClick={logout}>Log Out</button>
        </div>
    )
};

export default Menu;