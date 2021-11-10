import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './nav.styles.scss';

import Menu from '../menu/menu.component';

const Nav = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

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
            {
                menuVisible
                ? <Menu />
                : null
            }
            <div className='menu-button' onClick={toggleMenu} ></div>
            <button className='logout-button' onClick={logout}>Log Out</button>
        </div>
    );
}

export default Nav;