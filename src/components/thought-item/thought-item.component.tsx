import React from 'react';
import { collection, doc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import './thought-item.styles.scss';
import { User } from '../../App';

interface Props {
    text: string,
    image: string,
    id: string,
    user: User
}

const ThoughtItem: React.FC<Props> = (props) => {
    const { text, image, id, user } = props;

    const editThought = async (e: React.FocusEvent<HTMLFormElement, Element>) => {
        const { name, value } = e.target;

        const usersRef = collection(db, 'users');
		const userQuery = query(usersRef, where('uid', '==', user.uid));
		const querySnapshot = await getDocs(userQuery);
        const foundUser = querySnapshot.docs[0];

        const thoughtRef = doc(db, `users/${foundUser.id}/thoughts`, id);

        await updateDoc(thoughtRef, {
            [name]: value
          });
    }

    return (
    <form style={{backgroundImage: `url(${image})`}} className='thought-item' onBlur={(e) => editThought(e)} >
        <div className='label text'>
            <p>Text</p>
            <input name='text' defaultValue={text} className='thought-item-input' />
        </div>
        <div className='label image'>
            <p>Image</p>
            <input name='image' defaultValue={image} className='thought-item-input' />
        </div>
    </form>
)};

export default ThoughtItem;