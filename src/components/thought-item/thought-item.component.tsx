import React from 'react';

import './thought-item.styles.scss';
import { User } from '../../App';

interface Props {
    text: string,
    image: string,
    id: string,
    user: User
}

const ThoughtItem: React.FC<Props> = ({ text, image, id }) => {

    return (
    <form style={{backgroundImage: `url(${image})`}} className='thought-item'>
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