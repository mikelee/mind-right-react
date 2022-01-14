import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './user-page.styles.scss';

import { Category } from '../data-loader/data-loader.component';
import { Thought } from '../data-loader/data-loader.component';

import RandomThought from '../random-thought/random-thought.component';
import ThoughtsList from '../thoughts-list/thoughts-list.component';
import Nav from '../nav/nav.component';

interface Props {
    categories: Category[] | null, 
    thoughts: Thought[] | null
    user: any,
    getUserData: (uid: string) => Promise<any>
}

const UserPage: React.FC<Props> = ({ categories, thoughts, user, getUserData }) => {
    
    return (
        <div className='user-page'>
            <Nav />
            <Routes>
                <Route path='/' element={<RandomThought thoughts={thoughts} />} />
                <Route path='/thoughts' element={<ThoughtsList categories={categories} thoughts={thoughts} user={user} getUserData={getUserData} />} />
            </Routes>
        </div>
    );
};

export default UserPage;