import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import { User } from '../../App'; 

import SkeletonScreen from '../skeleton-screen/skeleton-screen.component';
import UserPage from '../user-page/user-page.component';

export interface Category {
    name: string,
    selected: boolean
}

export interface Thought {
    id: string,
    categories: string[],
    text: string,
    image: string
}

interface Props {
    user: User | null
}

const DataLoader: React.FC<Props> = ({ user }) => {

    const [thoughts, setThoughts] = useState<Thought[] | null>(null);
    const [categories, setCategories] = useState<string[] | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            const callGetUserData = async () => {
                await getUserData(user.uid);
                setDataLoaded(true);
            }

            callGetUserData();
        }
    }, [user]);

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

        const categoriesRef = collection(db, 'categories');
        const categoriesQuery = query(categoriesRef, where('userId', '==', uid));
        const usersCategories = await getDocs(categoriesQuery);

        usersCategories.forEach((el) => {
            const data = el.data();

            setCategories(data.categoryList);
        });
    }

    return (
        <div className='data-loader'>
            {
                dataLoaded ?
                    <UserPage categories={categories} thoughts={thoughts} user={user} getUserData={getUserData} />
                :
                    <SkeletonScreen />
            }
        </div>
    );
}

export default DataLoader;