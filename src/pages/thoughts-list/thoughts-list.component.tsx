import React, { useEffect, useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

import './thoughts-list.styles.scss';

import { Category } from '../../components/data-loader/data-loader.component';
import { Thought } from '../../components/data-loader/data-loader.component';
import { User } from '../../App';

import Button from '../../components/button/button.component';
import ThoughtItem from '../../components/thought-item/thought-item.component';
import ThoughtsFilter from '../../components/thoughts-filter/thoughts-filter.component';

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
    const [containsAll, setContainsAll] = useState(false);

    useEffect(() => {
        // set intital filterCategories
        if (categories) createThoughtCategories(categories);
    }, [categories]);

    useEffect(() => {
        updateFilteredThoughts(filterCategories);
    }, [filterCategories, containsAll]);

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
        filterCategories?.forEach((category: Category) => {
            if (category.selected) {
                selectedCategories.push(category.id);
            };
        });

        // use all thoughts if no categories are selected
        if (selectedCategories.length === 0) {
            setFilteredThoughts(thoughts);
            return;
        }

        let updatedThoughts;

        // By default, shows thoughts that have at least one of the selected categories in it's thoughtCategories
        // containsAll = true, shows thoughts that have every one of the selected categories in it's thoughtCategories
        if (containsAll) {
            // put all thoughts that have every category that is in the selectedCategories array in the updatedThoughts array
            updatedThoughts = thoughts?.filter(thought => {
                let isTrue = true;

                selectedCategories.forEach(selectedCategory => {
                    if (!thought.categories.some(thoughtCategory => thoughtCategory.id === selectedCategory)) isTrue = false;
                });

                return isTrue;
            });
        } else {
            // put all thoughts that have at least one category that is in the selectedCategories array in the updatedThoughts array
            updatedThoughts = thoughts?.filter(thought => {
                let isTrue = false;

                thought.categories.forEach(category => {
                    if (selectedCategories?.includes(category.id)) isTrue = true;
                });

                return isTrue;
            });
        }

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
                <Button text={'Add'} onClick={addThought} />
                <Button text={'Filter'} onClick={() => setThoughtsFilterVisible(!thoughtsFilterVisible)} />
            </div>
            {
                thoughtsFilterVisible
                ? <ThoughtsFilter categories={filterCategories} containsAll={containsAll} setContainsAll={setContainsAll} setFilterCategories={setFilterCategories}/>
                : null
            }
            {
                filteredThoughts?.map(thought => <ThoughtItem key={thought.id} id={thought.id} text={thought.text} image={thought.image} thoughtCategories={thought.categories} categories={categories} user={user} getUserData={getUserData} />)
            }
        </div>
    );
}

export default ThoughtsList;