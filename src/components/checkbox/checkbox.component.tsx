import React from 'react';

import './checkbox.styles.scss';

interface Props {
    checked: boolean,
    onClick: Function
}

const Checkbox: React.FC<Props> = ({ checked, onClick }) => (
    <div
        className={`checkbox ${checked ? 'checked' : ''}`}
        onClick={(event) => onClick(event)}
    ></div>
);

export default Checkbox;