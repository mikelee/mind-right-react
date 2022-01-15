import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './menu.styles.scss';

import { Category } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Categories from '../categories/categories.component';
import Submenu from '../submenu/submenu.component';

interface Props {
    categories: Category[] | null,
    user: User | null,
    toggleMenu: () => void,
    getCategories: (uid: string) => Promise<any>
}

const Menu: React.FC<Props> = ({ categories, user, toggleMenu, getCategories }) => {

    const [categoriesVisible, setCategoriesVisible] = useState(false);
    
    let navigate = useNavigate();

    const toggleCategories = () => {
        setCategoriesVisible(!categoriesVisible);
    }
    
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
            <div className='menu-item menu-item--categories' onMouseEnter={toggleCategories} onMouseLeave={toggleCategories} >
                Categories
                {
                    categoriesVisible
                    ? <Submenu childComponent={<Categories categories={categories} user={user} getCategories={getCategories} />} />
                    : null
                }
            </div>
            <div className='menu-item' onClick={logout}>Log Out</div>
        </div>
    );
};

export default Menu;