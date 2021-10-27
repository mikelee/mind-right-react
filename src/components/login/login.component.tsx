import React from 'react';

import './login.styles.scss';

interface Props {
    type: string | null
}

const Login: React.FC<Props> = ({ type }) => (
    <div className='login'>
        {
            type === 'sign-up'
            ?
                <>
                    <p className='title'>Sign Up</p>
                </>
            :
                <>
                    <p className='title'>Login</p>
                </>
        }
    </div>
);

export default Login;