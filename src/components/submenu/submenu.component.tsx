import React from 'react';

import './submenu.styles.scss';

interface Props {
    childComponent: React.ReactElement
}

const Submenu: React.FC<Props> = ({ childComponent }) => {
    return (
        <div className='submenu'>
            {childComponent}
        </div>
    );
}

export default Submenu;