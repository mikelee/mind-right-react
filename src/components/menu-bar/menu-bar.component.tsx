import React, { useEffect, useState } from 'react';

import './menu-bar.styles.scss';

import { Category, Thought } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Menu from '../menu/menu.component';
import MenuIcon from '../menu-icon/menu-icon.component';

interface Props {
    categories: Category[] | null,
    thoughts: Thought[] | null,
    user: User | null,
    getCategories: (uid: string) => Promise<any>,
    getUserData: (uid: string) => Promise<any>
}

const MenuBar: React.FC<Props> = ({ categories, thoughts, user, getCategories, getUserData }) => {

    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        menuVisible && window.innerWidth <= 480
        ? document.body.style.overflow = 'hidden'
        : document.body.style.overflow = 'visible';
    }, [menuVisible]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <div className='menu-bar'>
            {
                menuVisible
                ? <Menu categories={categories} thoughts={thoughts} user={user} toggleMenu={toggleMenu} getCategories={getCategories} getUserData={getUserData} />
                : null
            }
            <button className='menu-button' onClick={toggleMenu}>
                <MenuIcon />
            </button>
        </div>
    );
}

export default MenuBar;