import React from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
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
        const usersRef = collection(db, 'users');
		const userQuery = query(usersRef, where('uid', '==', user.uid));
		const querySnapshot = await getDocs(userQuery);
        const foundUser = querySnapshot.docs[0];

        const thoughtsRef = collection(db, `users/${foundUser.id}/thoughts`)

        addDoc(thoughtsRef, {
            text: '',
            image: ''
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