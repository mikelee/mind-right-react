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
    const [tab, setTab] = useState<'select' | 'edit'>('select');

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

            // delete category from categories
            await deleteDoc(categoryRef);

            // remove category from every thought's categories
            thoughts?.forEach(async thought => {
                for (let i = 0; i < thought.categories.length; i++) {
                    if (thought.categories[i].id === categoryForDeletion.id) {
                        thought.categories.splice(i, 1);

                        const thoughtRef = doc(db, 'thoughts', thought.id);

                        await updateDoc(thoughtRef, {
                            categories: thought.categories
                        });
                    }
                }
            });

            // update categories and thoughts
            if (user) await getUserData(user.uid);
            
            setConfirmDeleteVisible(false);
        }
    }

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = (e.currentTarget as HTMLFormElement);
        
        // loop through previous categories and get each form input with that category's id
        categories?.forEach(async category => {
            const inputField = form[category.id];
            const updatedCategory = inputField.value;

            // Update category if the name is different
            if (category.name !== updatedCategory) {
                const categoryRef = doc(db, 'categories', category.id);

                await updateDoc(categoryRef, {
                    name: updatedCategory
                });

                if (thoughts) {
                    await Promise.all(thoughts.map(async thought => {
                        for (let i = 0; i < thought.categories.length; i++) {
                            if (thought.categories[i].id === category.id) {
                                thought.categories[i] = {
                                    id: category.id,
                                    name: updatedCategory
                                };
    
                                const thoughtRef = doc(db, 'thoughts', thought.id);
    
                                await updateDoc(thoughtRef, {
                                    categories: thought.categories
                                });
                            }
                        }
                    }));
                    
                    if (user) await getUserData(user.uid);
                }
            }
        });
    }

    return (
        <div className='categories'>
            <div className='categories-tabs'>
                <div className={`categories-tabs--select ${tab !== 'select' ? 'background-tab background-tab--select' : ''}`} onClick={() => setTab('select')}>
                    <p>Select</p>
                </div>
                <div className={`categories-tabs--edit ${tab !== 'edit' ? 'background-tab background-tab--edit' : ''}`}  onClick={() => setTab('edit')}>
                    <p>Edit</p>
                </div>
            </div>
                {
                    tab === 'select'
                    ?
                        <div className='categories-list'>
                            {categories?.map(category => 
                                <div className='category-item' key={category.id} >
                                    <Checkbox checked={category.selected} onClick={() => toggleCategory(category.id, category.selected)} />
                                    <p className='text' onDoubleClick={() => clickDelete(category)} >{category.name}</p>
                                </div>
                            )}
                        </div>

                    :
                        <form id='categories-form' onSubmit={e => save(e)}>
                            {
                                categories?.map(category =>
                                    <div className='categories-form-input' key={category.id}>
                                        <input defaultValue={category.name} name={category.id} />
                                    </div>
                                )
                            }
                        </form>
                }
            <div className='categories-buttons'>
                {
                    tab === 'select'
                    ? 
                        <>
                            {
                                displayAddInput
                                ?
                                    <div className='add-category-section'>
                                        <form>
                                            <input type='text' placeholder='Category name' onChange={(e) => setNewCategoryName(e.target.value)} autoFocus />
                                            <Button text='Submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => addCategory(e)} />
                                        </form>
                                        <button className='cancel-add-button' onClick={() => setDisplayAddInput(false)}>Cancel</button>
                                    </div>
                                :
                                    <Button text='Add' onClick={() => setDisplayAddInput(true)} />
                            }
                            
                        </>
                    : <Button text='Save' type='submit' form='categories-form' className='categories-save-button' />
                }                
            </div>
            {
                confirmDeleteVisible && categoryForDeletion
                ?
                    <div className='confirm-delete'>
                        <p>{`Are you sure you want to delete ${categoryForDeletion.name}?`}</p>
                        <div className='confirm-delete-buttons'>
                            <button onClick={() => setConfirmDeleteVisible(false)}>Cancel</button>
                            <button onClick={() => deleteCategory()}>Delete</button>
                        </div>
                    </div>
                : null
            }
        </div>
    );
}

export default Categories;