import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import './user-page.styles.scss';

import Button from '../button/button.component';

export interface Thought {
    id: string,
    text: string,
    image: string
}

interface Props {
    user: any
}

const UserPage: React.FC<Props> = ({ user }) => {

    const userPageRef = useRef<any>(null);

    const [thoughts, setThoughts] = useState<Thought[] | null>(null);
    const [text, setText] = useState('');

    useEffect(() => {
        const callGetUserData = async () => {
            const data = await getUserData(user.uid);

		    setThoughts(data);
            shuffleThought(data);
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

    const shuffleThought = async (thoughts: Thought[] | null) => {
        if (thoughts) {
            const randomIndex = Math.floor((Math.random() * thoughts.length));

            const thought = thoughts[randomIndex];

            setText(thought.text);

            userPageRef.current.style.backgroundImage = `url(${thought.image})`;
        }
    }
    
    return (
        <div className='user-page' ref={userPageRef} >
            <p className='text'>{text}</p>
            <Button className='shuffle-button' text='Shuffle' onClick={() => shuffleThought(thoughts)} />
        </div>
    );
};

export default UserPage;