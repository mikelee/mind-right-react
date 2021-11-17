import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to='/thoughts' className='menu-item'>Thoughts</Link>
            <div className='menu-item' onClick={logout}>Log Out</div>
        </div>
    )
};

export default Menu;