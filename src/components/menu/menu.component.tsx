import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './menu.styles.scss';

import { Category, Thought } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Categories from '../categories/categories.component';
import Submenu from '../submenu/submenu.component';

interface Props {
    categories: Category[] | null,
    thoughts: Thought[] | null,
    user: User | null,
    toggleMenu: () => void,
    getCategories: (uid: string) => Promise<any>
    getUserData: (uid: string) => Promise<any>
}

const Menu: React.FC<Props> = ({ categories, thoughts, user, toggleMenu, getCategories, getUserData }) => {

    const [categoriesVisible, setCategoriesVisible] = useState(false);
    
    let navigate = useNavigate();

    const toggleCategories = () => {
        setCategoriesVisible(!categoriesVisible);
    }
    
    const logout = () => {
        signOut(auth)
        .then(() => {
            navigate('/logged-out');
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <nav className='menu'>
            <ul>
                <li>
                    <Link to='/home' className='menu-item' onClick={toggleMenu}>Home</Link>
                </li>
                <li>
                    <Link to='/home/thoughts' className='menu-item' onClick={toggleMenu}>Thoughts</Link>
                </li>
                <li className='menu-item menu-item--categories' onMouseEnter={toggleCategories} onMouseLeave={toggleCategories} >
                    Categories
                    {
                        categoriesVisible
                        ? <Submenu childComponent={<Categories categories={categories} thoughts={thoughts} user={user} getCategories={getCategories} getUserData={getUserData} />} />
                        : null
                    }
                </li>
                <li className='menu-item' onClick={logout}>Log Out</li>
            </ul>
        </nav>
    );
};

export default Menu;