import React, { useEffect, useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

import './thoughts-list.styles.scss';

import { Category } from '../data-loader/data-loader.component';
import { Thought } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Button from '../button/button.component';
import ThoughtItem from '../thought-item/thought-item.component';
import ThoughtsFilter from '../thoughts-filter/thoughts-filter.component';

interface Props {
    categories: Category[] | null,
    thoughts: Thought[] | null,
    user: User,
    getUserData: (uid: string) => Promise<any>
}

const ThoughtsList: React.FC<Props> = ({ categories, thoughts, user, getUserData }) => {

    const [thoughtsFilterVisible, setThoughtsFilterVisible] = useState(false);
    const [filteredThoughts, setFilteredThoughts] = useState<Thought[] | null>([]);
    const [filterCategories, setFilterCategories] = useState<Category[]>([]);

    useEffect(() => {
        // set intital filterCategories
        if (categories) createThoughtCategories(categories);
    }, [categories]);

    useEffect(() => {
        updateFilteredThoughts(filterCategories);
    }, [filterCategories]);

    const createThoughtCategories = (categories: Category[]) => {
        // Set all the filtereCategories selected to false
        const filterCategories: Category[] = categories.map(category => ({
            ...category, 
            selected: false
        }));

        setFilterCategories(filterCategories);
    }

    const updateFilteredThoughts = (filterCategories: Category[]) => {
        // if the category is selected, put its id in the selectedCategories array
        let selectedCategories: string[] = [];
        filterCategories?.map((category: Category) => {
            if (category.selected) {
                selectedCategories.push(category.id);
            };
        });

        // use all thoughts if no categories are selected
        if (selectedCategories.length === 0) {
            setFilteredThoughts(thoughts);
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

        if (updatedThoughts) setFilteredThoughts(updatedThoughts);
    }

    const addThought = async () => {
        const thoughtsRef = collection(db, 'thoughts');

        addDoc(thoughtsRef, {
            text: '',
            image: '',
            categories: [],
            userId: user.uid,
            timestamp: Timestamp.fromMillis(Date.now())
        });

        getUserData(user.uid);
    }

    return (
        <div className='thoughts-list'>
            <div className='buttons'>
                <Button className='add-button' text={'Add'} onClick={addThought} />
                <Button className='categories-button' text={'Filter'} onClick={() => setThoughtsFilterVisible(!thoughtsFilterVisible)} />
            </div>
            {
                thoughtsFilterVisible
                ? <ThoughtsFilter categories={filterCategories} setFilterCategories={setFilterCategories}/>
                : null
            }
            {
                filteredThoughts?.map(thought => <ThoughtItem key={thought.id} {...thought} user={user} getUserData={getUserData} />)
            }
        </div>
    );
}

export default ThoughtsList;


//ThoughtsList gets all thoughts
// ThoughtsList gets all categories
    // Categories are remade to have selected set to false on mount. These new categories are sent to ThoughtsFilter along with setNewCategories()
// ThoughtsFilter gets new categories
    // Click a category, setNewCategories() is called
    // ThoughtsList get the newCategories, a useEffect depends on them. It calls setFilteredThoughts. Filtered Thoughts are displayed in ThoughtsList