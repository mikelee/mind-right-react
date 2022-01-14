import React, { useEffect, useState } from 'react';
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

    const [selectedThoughts, setSelectedThoughts] = useState<Thought[] | null>(thoughts);

    const updateSelectedThoughts = () => {
        // if the category is selected, put its id in the selectedCategories array
        let selectedCategories: string[] = [];
        categories?.map(category => {
            if (category.selected) {
                selectedCategories.push(category.id);
            };
        });

        // use all thoughts if no categories are selected
        if (selectedCategories.length === 0) {
            setSelectedThoughts(thoughts);
            return;
        }

        // put all thoughts that have a category that is in the selectedCategories array in the updatedThoughts array
        const updatedThoughts = thoughts?.filter(thought => {
            let isTrue= false;

            thought.categories.forEach(categoryId => {
                if (selectedCategories?.includes(categoryId)) isTrue = true;
            });

            return isTrue;
        });

        if (updatedThoughts) setSelectedThoughts(updatedThoughts);
    }

    useEffect(() => {
        updateSelectedThoughts();
    }, [categories]);
    
    return (
        <div className='user-page'>
            <Nav />
            <Routes>
                <Route path='/' element={<RandomThought thoughts={selectedThoughts} />} />
                <Route path='/thoughts' element={<ThoughtsList categories={categories} thoughts={thoughts} user={user} getUserData={getUserData} />} />
            </Routes>
        </div>
    );
};

export default UserPage;