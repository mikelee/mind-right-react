import React, { useState } from 'react';
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

    const [categoryFiltersVisible, setCategoryFiltersVisible] = useState(false);

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
                <Button className='categories-button' text={'Filter'} onClick={() => setCategoryFiltersVisible(!categoryFiltersVisible)} />
            </div>
            {
                categoryFiltersVisible
                ? <ThoughtsFilter categories={categories} />
                : null
            }
            {
                thoughts?.map(thought => <ThoughtItem key={thought.id} {...thought} user={user} getUserData={getUserData} />)
            }
        </div>
    );
}

export default ThoughtsList;