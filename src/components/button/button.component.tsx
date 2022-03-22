import React from 'react';

import './button.styles.scss';

interface Props {
    text: string,
    onClick?: (e?: any) => void,
    name?: string,
    dataTestId?: string,
    className?: string,
    type?: 'button' | 'submit' | 'reset' | undefined,
    form?: string | undefined
}

const Button: React.FC<Props> = ({ className, dataTestId, form, name, onClick, text, type }) => (
    <button className={`button ${className ? className : ''}`} onClick={onClick} name={name} type={type} form={form} data-testid={dataTestId} >{text}</button>
);

export default Button;