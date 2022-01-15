import React, { useState } from 'react';

import './checkbox.styles.scss';

interface Props {
    checked: boolean,
    onClick: Function
}

const Checkbox: React.FC<Props> = ({ checked, onClick }) => {

    const [isChecked, setIsChecked] = useState(checked);

    const toggleChecked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClick(event);
        setIsChecked(!isChecked);
    }

    return (
        <div
            className={`checkbox ${isChecked ? 'checked' : ''}`}
            onClick={(event) =>toggleChecked(event)}
        ></div>
    );
}

export default Checkbox;