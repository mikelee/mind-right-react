import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import { User } from '../../App'; 

import SkeletonScreen from '../skeleton-screen/skeleton-screen.component';
import UserPage from '../user-page/user-page.component';

export interface Category {
    id: string,
    name: string,
    selected: boolean
}

export interface ThoughtCategory {
    id: string,
    name: string
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
    const [categories, setCategories] = useState<Category[] | null>(null);
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
        await getThoughts(uid);
        await getCategories(uid);
    }

    const getThoughts = async (uid: string) => {
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

    const getCategories = async (uid: string) => {
        const categories: Category[] = [];

        const categoriesRef = collection(db, 'categories');
        const categoriesQuery = query(categoriesRef, where('userId', '==', uid), orderBy('name', 'asc'));
        const usersCategories = await getDocs(categoriesQuery);

        usersCategories.forEach(el => {
            const data = el.data();

            const category = {
                id: el.id,
                name: data.name,
                selected: data.selected
            }

            categories.push(category);
        });
        
        setCategories(categories);
    }

    return (
        <div className='data-loader'>
            {
                dataLoaded ?
                    <UserPage categories={categories} thoughts={thoughts} user={user} getUserData={getUserData} getCategories={getCategories} />
                :
                    <SkeletonScreen />
            }
        </div>
    );
}

export default DataLoader;