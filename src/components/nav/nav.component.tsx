import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Nav = () => {

    const logout = () => {
        signOut(auth)
        .then(() => {
            console.log('logged out')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className='nav'>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}

export default Nav;