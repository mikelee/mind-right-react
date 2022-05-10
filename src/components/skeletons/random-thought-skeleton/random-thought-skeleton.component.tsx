import React from 'react';

import './random-thought-skeleton.styles.scss';

const RandomThoughtSkeleton = () => (
    <div className='random-thought-skeleton' data-testid='skeleton-screen'>
        <div className='nav-area'>
            <div className='menu-block'></div>
        </div>
        <div className='text-container'>
            <div className='text-block-1'></div>
            <div className='text-block-2'></div>
            <div className='text-block-3'></div>
        </div>
        <div className='shuffle-button-block'></div>
        <div className='pulse'></div>
    </div>
);

export default RandomThoughtSkeleton;