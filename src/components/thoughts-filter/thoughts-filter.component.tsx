import React from 'react';

import './thoughts-filter.styles.scss';

import { Category } from '../data-loader/data-loader.component';

interface Props {
    categories: Category[] | null
}

const ThoughtsFilter: React.FC<Props> = ({ categories }) => {
    return (
        <div className='thoughts-filter'>
            {
                categories?.map((category, index) =>
                    <div key={index} className='category'>
                        <input type='checkbox' />
                        <p>{category}</p>
                    </div>
                )
            }
        </div>
    );
}

export default ThoughtsFilter;