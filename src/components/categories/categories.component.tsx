import React, { useState } from 'react';
import { doc, collection, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import './categories.styles.scss';

import { Category, Thought } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Checkbox from '../checkbox/checkbox.component';
import Button from '../button/button.component';


interface Props {
    categories: Category[] | null,
    thoughts: Thought[] | null,
    user: User | null,
    getCategories: (uid: string) => Promise<any>,
    getUserData: (uid: string) => Promise<any>
}

const Categories: React.FC<Props> = ({ categories, thoughts, user, getCategories, getUserData }) => {

    const [displayAddInput, setDisplayAddInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [categoryForDeletion, setCategoryForDeletion] = useState<Category | null>(null);

    const addCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (user) {
            const categoriesRef = collection(db, 'categories');
    
            await addDoc(categoriesRef, {
                name: newCategoryName,
                selected: false,
                userId: user.uid
            });

            await getCategories(user.uid);
            setDisplayAddInput(false);
        }
    }

    const toggleCategory = async (id: string, selected: boolean) => {
        const categoryRef = doc(db, 'categories', id);
        await updateDoc(categoryRef, { selected: !selected });

        // get updated categories from database
        if (user) getCategories(user.uid);
    }

    const clickDelete = (category: Category) => {
        setConfirmDeleteVisible(true);
        setCategoryForDeletion(category);
    }

    const deleteCategory = async () => {
        if (categoryForDeletion) {
            const categoryRef = doc(db, 'categories', categoryForDeletion.id);

            await deleteDoc(categoryRef);

            // get thoughts that have the deleted category in their categories array
            const thoughtsWithCategory = thoughts?.filter(thought => {
                if (thought.categories.includes(categoryForDeletion.id)) {
                    return true;
                } else {
                    return false;
                }
            });

            // remove the deleted category from each thought's category array
            thoughtsWithCategory?.forEach(thought => {
                const categoryIndex = thought.categories.indexOf(categoryForDeletion.id);
                thought.categories.splice(categoryIndex, 1);

                const thoughtRef = doc(db, 'thoughts', thought.id);

                updateDoc(thoughtRef, {
                    categories: thought.categories
                });
            });


            // update categories and thoughts
            if (user) await getUserData(user.uid);
            
            setConfirmDeleteVisible(false);
        }
    }

    return (
        <div className='categories'>
            <div className='categories-list'>
                {
                    categories?.map(category =>
                        <div key={category.id} className='category'>
                            <Checkbox checked={category.selected} onClick={() => toggleCategory(category.id, category.selected)} />
                            <p className='category-text' onDoubleClick={() => clickDelete(category)} >{category.name}</p>
                        </div>
                    )
                }
            </div>
            <div className='add-section'>
                {
                    displayAddInput
                    ? 
                        <>
                            <form>
                                <input type='text' placeholder='Category name' onChange={(e) => setNewCategoryName(e.target.value)} autoFocus />
                                <Button text='Submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => addCategory(e)} />
                            </form>
                            <button className='cancel-add-button' onClick={() => setDisplayAddInput(false)}>Cancel</button>
                        </>
                    : <Button className='add-button' text='Add' onClick={() => setDisplayAddInput(true)} />
                }
            </div>
            {
                confirmDeleteVisible && categoryForDeletion
                ?
                    <div className='confirm-delete'>
                        <p>{`Are you sure you want to delete ${categoryForDeletion.name}?`}</p>
                        <button onClick={() => setConfirmDeleteVisible(false)}>Cancel</button>
                        <button onClick={() => deleteCategory()}>Delete</button>
                    </div>
                : null
            }
        </div>
    );
}

export default Categories;