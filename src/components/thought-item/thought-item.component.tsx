import React from 'react';

import './thought-item.styles.scss';

interface Props {
    text: string,
    image: string,
    id: string
}

const ThoughtItem: React.FC<Props> = ({ text, image, id }) => {

    return (
    <form style={{backgroundImage: `url(${image})`}} className='thought-item'>
        <div className='label text'>
            <p>Text</p>
            <input value={text} className='thought-item-input' />
        </div>
        <div className='label image'>
            <p>Image</p>
            <input value={image} className='thought-item-input' />
        </div>
    </form>
)};

export default ThoughtItem;