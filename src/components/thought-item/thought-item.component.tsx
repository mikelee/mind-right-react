import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import './thought-item.styles.scss';

import beachImage from '../../assets/beach-image.jpeg';
import {ReactComponent as DeleteIcon} from '../../assets/delete.svg';

import { Category, ThoughtCategory } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Button from '../button/button.component';
import Checkbox from '../checkbox/checkbox.component';

interface Props {
    categories: Category[] | null,
    thoughtCategories: ThoughtCategory[],
    text: string,
    image: string,
    id: string,
    user: User,
    getUserData: (uid: string) => Promise<any>
}

const ThoughtItem: React.FC<Props> = ({ categories, thoughtCategories, text, image, id, user, getUserData }) => {

    const [addableCategories, setAddableCategories] = useState<Category[] | undefined | null>(null);

    const deleteThought = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, thoughtId: string) => {
        e.preventDefault();

        const thoughtRef = doc(db, 'thoughts', thoughtId);
        await deleteDoc(thoughtRef);

        getUserData(user.uid);
    }

    const editThought = async (e: React.FocusEvent<HTMLFormElement, Element>) => {
        const { name, value } = e.target;

        const thoughtRef = doc(db, 'thoughts', id);

        await updateDoc(thoughtRef, {
            [name]: value
        });

        getUserData(user.uid);
    }

    const displayAddableCategories = () => {
        const thoughtCategoriesIds = new Set();

        // put all current thoughtCategories in a set
        thoughtCategories.forEach(category => {
            thoughtCategoriesIds.add(category.id);
        });

        // get categories except the ones that are already in thoughtCategories
        const unChosenCategories = categories?.filter(category => !thoughtCategoriesIds.has(category.id));

        setAddableCategories(unChosenCategories);
    }

    const addCategory = async (category: Category) => {
        // add category to thoughtCategories
        const newThoughtCategories = [...thoughtCategories, category];
        
        const thoughtRef = doc(db, 'thoughts', id);
        
        // update thought's categories
        await updateDoc(thoughtRef, {
            categories: newThoughtCategories
        });
        
        // refresh user data
        if (user) await getUserData(user.uid);

        // update addableCategories so it doesn't include the category that was just added
        displayAddableCategories();
    }

    return (
        <div className='thought-item' style={image !== '' ? {backgroundImage: `url(${image})`} : {backgroundImage: `url(${beachImage})`}}>
            <form onBlur={(e) => editThought(e)} >
                <div className='label text'>
                    <p>Text</p>
                    <input name='text' defaultValue={text} className='thought-item-input' />
                </div>
                <div className='label image'>
                    <p>Image</p>
                    <input name='image' defaultValue={image} className='thought-item-input' />
                </div>
            </form>
            <div className='thought-categories'>
                <Button className='thought-categories-add-button' text='Add' onClick={() => displayAddableCategories()} />
                <div className='thought-categories-list'>
                    {
                        thoughtCategories?.map((thoughtCategory) => <p key={thoughtCategory.id}>{thoughtCategory.name}</p>)
                    }
                </div>
            </div>
            {
                addableCategories !== null
                ?
                    <div className='addable-categories'>
                        <div className='addable-categories-list'>
                            {
                                addableCategories?.map(addableCategory =>
                                    <div className='addable-category' key={addableCategory.id}>
                                        <Checkbox checked={false} onClick={() => addCategory(addableCategory)} />
                                        <p>{addableCategory.name}</p>
                                    </div>
                                )
                            }
                        </div>
                        <Button className='done-button' text='Done' onClick={() => setAddableCategories(null)} />
                    </div>
                : null
            }
            <button className='delete-button' onClick={(e) => deleteThought(e, id)}>
                <DeleteIcon className='delete-icon' />
            </button>
        </div>
)};

export default ThoughtItem;