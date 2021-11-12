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
            <div className='menu-item' onClick={logout}>Log Out</div>
        </div>
    )
};

export default Menu;