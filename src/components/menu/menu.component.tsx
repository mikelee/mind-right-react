import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './menu.styles.scss';

interface Props {
    toggleMenu: () => void
}

const Menu: React.FC<Props> = ({ toggleMenu }) => {
    
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
            <Link to='/thoughts' className='menu-item' onClick={toggleMenu}>Thoughts</Link>
            <div className='menu-item' onClick={logout}>Log Out</div>
        </div>
    );
};

export default Menu;