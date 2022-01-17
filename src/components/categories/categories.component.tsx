import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import './categories.styles.scss';

import { Category } from '../data-loader/data-loader.component';
import { User } from '../../App';

import Checkbox from '../checkbox/checkbox.component';


interface Props {
    categories: Category[] | null,
    user: User | null,
    getCategories: (uid: string) => Promise<any>
}

const Categories: React.FC<Props> = ({ categories, user, getCategories }) => {

    const toggleCategory = async (id: string, selected: boolean) => {
        const categoryRef = doc(db, 'categories', id);
        await updateDoc(categoryRef, { selected: !selected });

        // get updated categories from database
        if (user) getCategories(user.uid);
    }

    return (
        <div className='categories'>
            {
                categories?.map(category =>
                    <div key={category.id} className='category'>
                        <Checkbox checked={category.selected} onClick={() => toggleCategory(category.id, category.selected)} />
                        <p className='category-text'>{category.name}</p>
                    </div>
                )
            }
        </div>
    );
}

export default Categories;