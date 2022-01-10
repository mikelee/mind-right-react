import React from 'react';

import './category-filters.styles.scss';

interface Props {
    categories: string[]
}

const CategoryFilters: React.FC<Props> = ({ categories }) => {
    return (
        <div className='category-filters'>
            {
                categories.map(category =>
                    <div className='category'>
                        <input type='checkbox' />
                        <p>{category}</p>
                    </div>
                )
            }
        </div>
    );
}

export default CategoryFilters;