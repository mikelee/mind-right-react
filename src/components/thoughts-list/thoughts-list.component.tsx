import React from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

import './thoughts-list.styles.scss';
import { Thought } from '../user-page/user-page.component';
import { User } from '../../App';

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
            <Link to='/'>Back</Link>
            <button onClick={addThought}>Add Thought</button>
            {
                thoughts?.map(thought => <ThoughtItem key={thought.id} {...thought} user={user} getUserData={getUserData} />)
            }
        </div>
    );
}

export default ThoughtsList;