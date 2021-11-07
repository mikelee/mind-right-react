import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import './user-page.styles.scss';

import Button from '../button/button.component';

export interface Thought {
    text: string,
    id: string
}

interface Props {
    user: any
}

const UserPage: React.FC<Props> = ({ user }) => {

    const [thoughts, setThoughts] = useState<Thought[] | null>(null);
    const [text, setText] = useState('');

    useEffect(() => {
        const callGetUserData = async () => {
            const data = await getUserData(user.uid);
		    setThoughts(data);

            const randomThought = getRandomThought(data);

            if (randomThought) {
                setText(randomThought.text)
            }
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

    const getRandomThought = (thoughts: Thought[] | null) => {
        if (thoughts) {
            const randomIndex = Math.floor((Math.random() * thoughts.length));

            return thoughts[randomIndex];
        }
    }

    const shuffleThought = (thoughts: Thought[] | null) => {
        if (thoughts) {
            const randomIndex = Math.floor((Math.random() * thoughts.length));

            const thought = thoughts[randomIndex];

            setText(thought.text);
        }
    }
    
    return (
        <div className='user-page'>
            <p className='text'>{text}</p>
            <Button text='Shuffle' onClick={() => shuffleThought(thoughts)} />
        </div>
    );
};

export default UserPage;