import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import UserPage from '../user-page/user-page.component';

export interface Thought {
    id: string,
    text: string,
    image: string
}

interface Props {
    user: any
}

const DataLoader: React.FC<Props> = ({ user }) => {

    const [thoughts, setThoughts] = useState<Thought[] | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const callGetUserData = async () => {
            await getUserData(user.uid);
            setDataLoaded(true);
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
        <div className='data-loader'>
            {
                dataLoaded ?
                    <UserPage thoughts={thoughts} user={user} getUserData={getUserData} />
                :
                    <p>Loading</p>
            }
        </div>
    );
}

export default DataLoader;