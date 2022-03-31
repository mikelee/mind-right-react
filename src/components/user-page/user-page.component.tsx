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
    getUserData: (uid: string) => Promise<any>,
    getCategories: (uid: string) => Promise<any>
}

const UserPage: React.FC<Props> = ({ categories, thoughts, user, getUserData, getCategories }) => {

    const [selectedThoughts, setSelectedThoughts] = useState<Thought[] | null>(thoughts);
    const [areUnselectedThoughts, setAreUnselectedThoughts] = useState(false);

    const updateSelectedThoughts = () => {
        // if the category is selected, put its id in the selectedCategories array
        let selectedCategories: string[] = [];
        categories?.forEach(category => {
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

            thought.categories.forEach(category => {
                if (selectedCategories?.includes(category.id)) isTrue = true;
            });

            return isTrue;
        });

        if (updatedThoughts) setSelectedThoughts(updatedThoughts);
    }

    const updateAreUnSelectedThoughts = (thoughts: Thought[] | null) => {
        // sets areSelectedThoughts to true if there are thoughts in the thought array. This is used if there appears to be no thoughts (because the selected categories return no thoughts), but there are.
        if (thoughts && thoughts.length > 0) {
            setAreUnselectedThoughts(true);
        } else {
            setAreUnselectedThoughts(false);
        }
    }

    useEffect(() => {
        updateSelectedThoughts();
        updateAreUnSelectedThoughts(thoughts);
    }, [categories]);
    
    return (
        <div className='user-page' data-testid='user-page'>
            <Nav categories={categories} thoughts={thoughts} user={user} getCategories={getCategories} getUserData={getUserData} />
            <Routes>
                <Route path='/' element={<RandomThought thoughts={selectedThoughts} areUnselectedThoughts={areUnselectedThoughts} />} />
                <Route path='/thoughts' element={<ThoughtsList categories={categories} thoughts={thoughts} user={user} getUserData={getUserData} />} />
            </Routes>
        </div>
    );
};

export default UserPage;