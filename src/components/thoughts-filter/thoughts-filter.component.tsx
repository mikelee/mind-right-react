import React from 'react';

import './thoughts-filter.styles.scss';

import { Category } from '../data-loader/data-loader.component';

import Checkbox from '../checkbox/checkbox.component';

interface Props {
    categories: Category[] | null,
    setFilterCategories: Function
}

const ThoughtsFilter: React.FC<Props> = ({ categories, setFilterCategories }) => {

    const updateCategories = (id: string) => {
        const updatedCategories = categories?.map(category => {
            if (category.id === id) {
                return ({
                    ...category,
                    selected: !category.selected
                })
            } else {
                return category;
            }
        });
        
        setFilterCategories(updatedCategories);
    }

    return (
        <div className='thoughts-filter'>
            {
                categories?.map((category, index) =>
                    <div key={index} className='category'>
                        <Checkbox checked={category.selected} onClick={() => updateCategories(category.id)} />
                        <p>{category.name}</p>
                    </div>
                )
            }
        </div>
    );
}

export default ThoughtsFilter;