import React from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import './thought-item.styles.scss';

import { User } from '../../App';

import beachImage from '../../assets/beach-image.jpeg';
import {ReactComponent as DeleteIcon} from '../../assets/delete.svg';

interface Props {
    categories: string[],
    text: string,
    image: string,
    id: string,
    user: User,
    getUserData: (uid: string) => Promise<any>
}

const ThoughtItem: React.FC<Props> = ({ categories, text, image, id, user, getUserData }) => {

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
            <button className='delete-button' onClick={(e) => deleteThought(e, id)}>
                <DeleteIcon className='delete-icon' />
            </button>
            <div className='thought-categories'>
                {categories?.join(', ')}
            </div>
        </div>
)};

export default ThoughtItem;