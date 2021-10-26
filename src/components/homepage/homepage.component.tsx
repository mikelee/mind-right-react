import React from 'react';

import './homepage.styles.scss';

const Homepage: React.FC = () => (
    <div className='homepage'>
        <h1 className='name'>MindRight</h1>
        <div className='buttons'>
            <button className='button'>Sign Up</button>
            <button className='button'>Sign In</button>
        </div>
        <div className='tile tile-center'></div>
        <div className='tile tile-top-left'></div>
        <div className='tile tile-top-middle'></div>
        <div className='tile tile-bottom-left'></div>
        <div className='tile tile-bottom-right'></div>
    </div>
);

export default Homepage;