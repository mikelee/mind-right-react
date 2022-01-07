import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './menu.styles.scss';

interface Props {
    toggleMenu: () => void
}

const Menu: React.FC<Props> = ({ toggleMenu }) => {
    
    let navigate = useNavigate();
    
    const logout = () => {
        signOut(auth)
        .then(() => {
            console.log('logged out')
            navigate('/');
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className='menu'>
            <Link to='/home' className='menu-item' onClick={toggleMenu}>Home</Link>
            <Link to='/home/thoughts' className='menu-item' onClick={toggleMenu}>Thoughts</Link>
            <div className='menu-item' onClick={logout}>Log Out</div>
        </div>
    );
};

export default Menu;