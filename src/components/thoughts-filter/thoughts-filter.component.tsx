import React from 'react';

import './thoughts-filter.styles.scss';

import { Category } from '../data-loader/data-loader.component';

import Checkbox from '../checkbox/checkbox.component';

interface Props {
    categories: Category[] | null,
    containsAll: boolean,
    setContainsAll: React.Dispatch<React.SetStateAction<boolean>>,
    setFilterCategories: Function
}

const ThoughtsFilter: React.FC<Props> = ({ categories, containsAll, setContainsAll, setFilterCategories }) => {

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
            <div className='category contains-all'>
                <Checkbox checked={containsAll} onClick={() => setContainsAll(!containsAll)} />
                <p>Contains all</p>
            </div>
            <div className='category-filters'>
                {
                    categories?.length !== 0
                    ?
                        categories?.map((category, index) =>
                            <div key={index} className='category'>
                                <Checkbox checked={category.selected} onClick={() => updateCategories(category.id)} />
                                <p>{category.name}</p>
                            </div>
                        )    
                    :
                    <p className='no-categories-message'>No categories</p>
                }
            </div>
            
        </div>
    );
}

export default ThoughtsFilter;