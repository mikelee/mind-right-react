import React from 'react';

import './skeleton-screen.styles.scss';

const SkeletonScreen: React.FC = () => {
    return (
        <div className='skeleton-screen'>
            <div className='menu-block'></div>
            <div className='text-block'></div>
            <div className='shuffle-button-block'></div>
        </div>
    );
}

export default SkeletonScreen;