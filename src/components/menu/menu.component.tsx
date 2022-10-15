import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './menu.styles.scss';
import {ReactComponent as CloseIcon} from '../../assets/delete.svg';

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

    const openCategories = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const name = (e.target as HTMLLIElement).getAttribute('data-name');

        if (name === 'categories-menu-button') setCategoriesVisible(true);
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
                {
                    window.innerWidth > 480
                    ?
                        <li className='menu-item menu-item--categories' onMouseEnter={toggleCategories} onMouseLeave={toggleCategories} >
                            Categories
                            {
                                categoriesVisible
                                ? <Submenu childComponent={<Categories categories={categories} thoughts={thoughts} user={user} getCategories={getCategories} getUserData={getUserData} />} />
                                : null
                            }
                        </li>
                    :
                        <li className='menu-item menu-item--categories' onClick={openCategories} data-name='categories-menu-button' >
                            Categories
                            {
                                categoriesVisible
                                ? <Submenu childComponent={<Categories categories={categories} thoughts={thoughts} user={user} getCategories={getCategories} getUserData={getUserData} />} />
                                : null
                            }
                        </li>
                }
                <li className='menu-item' onClick={logout}>Log Out</li>
            </ul>
            <button className='close-button' onClick={toggleMenu}>
                    <CloseIcon className='close-button-icon' />
            </button>
        </nav>
    );
};

export default Menu;