import React, { useEffect, useState } from 'react';
import { getDocuments } from '../../firebase';

import { Timestamp } from 'firebase/firestore';
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
    categories: ThoughtCategory[],
    text: string,
    image: string,
    timestamp?: Timestamp,
    userId?: string
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
        const usersThoughts = await getDocuments(uid, 'thoughts', {field: 'timestamp', direction: 'desc'});

        const thoughts = usersThoughts.map((thought: Thought) => ({
            id: thought.id,
            categories: thought.categories,
            text: thought.text,
            image: thought.image
        }));

        setThoughts(thoughts);
    }

    const getCategories = async (uid: string) => {
        const usersCategories = await getDocuments(uid, 'categories', {field: 'name', direction: 'asc'});

        const categories = usersCategories.map((category: Category) => ({
            id: category.id,
            name: category.name,
            selected: category.selected
        }));
        
        setCategories(categories);
    }

    return (
        <div className='data-loader' data-testid='data-loader'>
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