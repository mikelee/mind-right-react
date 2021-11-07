import React from 'react';

import './button.styles.scss';

interface Props {
    text: string,
    onClick: () => void
}

const Button: React.FC<Props> = ({ text, onClick }) => (
    <button className='button' onClick={onClick}>{text}</button>
);

export default Button;