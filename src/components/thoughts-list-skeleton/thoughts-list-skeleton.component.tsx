import React from 'react';

import './thoughts-list-skeleton.styles.scss';

const ThoughtsListSkeleton = () => (
    <div className='thoughts-list-skeleton' data-testid='skeleton-screen'>
        <div className='nav-area'>
            <div className='menu-block'></div>
        </div>
        <div className='buttons'>
            <div className='add-button-block'></div>
            <div className='filter-button-block'></div>
        </div>
        <div className='thought-item-block'>
            <div className='label-placeholder'></div>
            <div className='text-block'></div>
            <div className='label-placeholder'></div>
            <div className='text-block'></div>
            <div className='add-categories-button-block'></div>
        </div>
    </div>
);

export default ThoughtsListSkeleton;