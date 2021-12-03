import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import './user-page.styles.scss';

import RandomThought from '../random-thought/randomThought.component';
import ThoughtsList from '../thoughts-list/thoughtsList.component';

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

		const usersRef = collection(db, 'users');
		const userQuery = query(usersRef, where('uid', '==', uid));
		const querySnapshot = await getDocs(userQuery);

        const foundUser = querySnapshot.docs[0];
        const thoughtsSnap = await getDocs(collection(db, `users/${foundUser.id}/thoughts`))

        thoughtsSnap.forEach(el => {
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