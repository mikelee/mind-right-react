import React from 'react';

import './category-filters.styles.scss';

interface Props {
    categories: string[] | null
}

const CategoryFilters: React.FC<Props> = ({ categories }) => {
    return (
        <div className='category-filters'>
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

export default CategoryFilters;