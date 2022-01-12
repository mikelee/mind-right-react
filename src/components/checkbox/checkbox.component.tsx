import React, { useState } from 'react';

import './checkbox.styles.scss';

interface Props {
    checked: boolean
}

const Checkbox: React.FC<Props> = ({ checked }) => {

    const [isChecked, setIsChecked] = useState(checked);

    const toggleChecked = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div
            className={`checkbox ${isChecked ? 'checked' : ''}`}
            onClick={toggleChecked}
        ></div>
    );
}

export default Checkbox;