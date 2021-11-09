import React from 'react';

import './button.styles.scss';

interface Props {
    text: string,
    onClick?: (e?: any) => void,
    name?: string,
    dataTestId?: string,
    className?: string,
    type?: string
}

const Button: React.FC<Props> = ({ className, dataTestId, name, onClick, text }) => (
    <button className={`button ${className ? className : ''}`} onClick={onClick} name={name} data-testid={dataTestId} >{text}</button>
);

export default Button;