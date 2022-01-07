import React from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

import './thoughts-list.styles.scss';
import { Thought } from '../user-page/user-page.component';
import { User } from '../../App';

import Button from '../button/button.component';
import ThoughtItem from '../thought-item/thought-item.component';

interface Props {
    thoughts: Thought[] | null,
    user: User,
    getUserData: (uid: string) => Promise<any>
}

const ThoughtsList: React.FC<Props> = ({ thoughts, user, getUserData }) => {

    const addThought = async () => {
        const thoughtsRef = collection(db, 'thoughts');

        addDoc(thoughtsRef, {
            text: '',
            image: '',
            userId: user.uid,
            timestamp: Timestamp.fromMillis(Date.now())
        });

        getUserData(user.uid);
    }

    return (
        <div className='thoughts-list'>
            <Button className='add-button' text={'Add'} onClick={addThought} />
            {
                thoughts?.map(thought => <ThoughtItem key={thought.id} {...thought} user={user} getUserData={getUserData} />)
            }
        </div>
    );
}

export default ThoughtsList;