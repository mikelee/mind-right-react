import React, { useState } from 'react';
import { doc, collection, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import './categories.styles.scss';

import { Category } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Checkbox from '../checkbox/checkbox.component';
import Button from '../button/button.component';


interface Props {
    categories: Category[] | null,
    user: User | null,
    getCategories: (uid: string) => Promise<any>
}

const Categories: React.FC<Props> = ({ categories, user, getCategories }) => {

    const [displayAddInput, setDisplayAddInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

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

    return (
        <div className='categories'>
            <div className='categories-list'>
                {
                    categories?.map(category =>
                        <div key={category.id} className='category'>
                            <Checkbox checked={category.selected} onClick={() => toggleCategory(category.id, category.selected)} />
                            <p className='category-text'>{category.name}</p>
                        </div>
                    )
                }
            </div>
            <div className='add-section'>
                {
                    displayAddInput
                    ? 
                        <form>
                            <input type='text' placeholder='Category name' onChange={(e) => setNewCategoryName(e.target.value)} />
                            <Button text='Submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => addCategory(e)} />
                        </form>
                    : <Button className='add-button' text='Add' onClick={() => setDisplayAddInput(true)} />
                }
            </div>
        </div>
    );
}

export default Categories;