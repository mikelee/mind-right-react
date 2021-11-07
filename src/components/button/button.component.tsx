import React from 'react';

import './button.styles.scss';

interface Props {
    text: string,
    onClick: (e?: any) => void,
    name?: string,
    dataTestId?: string
}

const Button: React.FC<Props> = ({ dataTestId, name, onClick, text }) => (
    <button className='button' onClick={onClick} name={name} data-testid={dataTestId} >{text}</button>
);

export default Button;