import React from 'react';

import './homepage.styles.scss';

const Homepage: React.FC = () => (
    <div className='homepage'>
        <h1 className='name'>MindRight</h1>
        <div className='buttons'>
            <button className='button'>Sign Up</button>
            <button className='button'>Sign In</button>
        </div>
    </div>
);

export default Homepage;