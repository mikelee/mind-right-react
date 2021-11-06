import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import './user-page.styles.scss';

export interface Thought {
    text: string,
    id: string
}

interface Props {
    user: any
}

const UserPage: React.FC<Props> = ({ user }) => {

    const [thoughts, setThoughts] = useState<Thought[] | null>(null);

    useEffect(() => {
        const callGetUserData = async () => {
            const data = await getUserData(user.uid);
		    setThoughts(data);
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

            return thoughts;
	}
    
    return (
        <div className='user-page'>
            <p>User Page</p>

            {
                thoughts?.map((thought: Thought) => <p key={thought.id}>{thought.text}</p>)
            }
        </div>
    );
};

export default UserPage;