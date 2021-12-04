import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import './user-page.styles.scss';

import RandomThought from '../random-thought/random-thought.component';
import ThoughtsList from '../thoughts-list/thoughts-list.component';

export interface Thought {
    id: string,
    text: string,
    image: string
}

interface Props {
    user: any
}

const UserPage: React.FC<Props> = ({ user }) => {

    const [thoughts, setThoughts] = useState<Thought[] | null>(null);

    useEffect(() => {
        const callGetUserData = async () => {
            await getUserData(user.uid);
        }

        callGetUserData();
    }, [user.uid]);

    const getUserData = async (uid: string) => {
		const thoughts: any = [];

        const thoughtsRef = collection(db, 'thoughts');
        const thoughtsQuery = query(thoughtsRef, where('userId', '==', uid), orderBy('timestamp', 'desc'));
        const usersThoughts = await getDocs(thoughtsQuery);

        usersThoughts.docs.forEach(el => {
				const data = el.data();

				const thought = {
					...data,
					id: el.id
				}

				thoughts.push(thought);
			});

            setThoughts(thoughts);
	}
    
    return (
        <div className='user-page'>
            <Routes>
                <Route path='/' element={<RandomThought thoughts={thoughts} user={user} />} />
                <Route path='/thoughts' element={<ThoughtsList thoughts={thoughts} user={user} getUserData={getUserData} />} />
            </Routes>
        </div>
    );
};

export default UserPage;