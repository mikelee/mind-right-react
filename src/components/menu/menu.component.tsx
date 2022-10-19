import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import './menu.styles.scss';
import {ReactComponent as CloseIcon} from '../../assets/delete.svg';
import {ReactComponent as BackIcon} from '../../assets/back_icon.svg';

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

    const [submenu, setSubmenu] = useState<string | null>(null);
    
    let navigate = useNavigate();
    
    const logout = () => {
        signOut(auth)
        .then(() => {
            navigate('/logged-out');
        }).catch((error) => {
            console.log(error)
        });
    }

    const openSubmenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const type = (e.target as HTMLLIElement).getAttribute('data-type');

        // only change submenu if the target is a menu link. Prevents this from firing if a child element is clicked
        if (type === 'menu-link') {
            const name = (e.target as HTMLLIElement).getAttribute('data-name');

            setSubmenu(name);
        }
    }

    const toggleSubmenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (submenu === null) {
            const name = (e.target as HTMLLIElement).getAttribute('data-name');

            setSubmenu(name);
        } else {
            setSubmenu(null);
        }
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
                        <li className='menu-item menu-item--categories' data-name='categories' onMouseEnter={e => toggleSubmenu(e)} onMouseLeave={e => toggleSubmenu(e)} >
                            Categories
                            {
                                submenu === 'categories'
                                ? <Submenu childComponent={<Categories categories={categories} thoughts={thoughts} user={user} getCategories={getCategories} getUserData={getUserData} />} />
                                : null
                            }
                        </li>
                    :
                        <li className='menu-item menu-item--categories' data-type='menu-link' data-name='categories' onClick={openSubmenu} >
                            Categories
                            {
                                submenu === 'categories'
                                ? <Submenu childComponent={<Categories categories={categories} thoughts={thoughts} user={user} getCategories={getCategories} getUserData={getUserData} />} />
                                : null
                            }
                        </li>
                }
                <li className='menu-item' onClick={logout}>Log Out</li>
            </ul>
            {
                submenu !== null
                ?
                    <button className='back-button' onClick={() => setSubmenu(null)}>
                        <BackIcon className='back-button-icon' />
                    </button>
                : null
            }
            <button className='close-button' onClick={toggleMenu}>
                    <CloseIcon className='close-button-icon' />
            </button>
        </nav>
    );
};

export default Menu;