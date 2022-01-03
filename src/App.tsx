import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import './App.scss';

import DataLoader from './components/data-loader/data-loader.component';
import Homepage from './components/homepage/homepage.component';

export interface User {
	email: string | null,
	uid: string
}

function App() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		let unsubscribeFromAuth = onAuthStateChanged(auth, user => {
			let currentUser;

			if (user) {
				currentUser = {
					email: user.email,
					uid: user.uid
				}
			} else {
				currentUser = null;
			}
			
			setUser(currentUser);
		});

		return unsubscribeFromAuth;
	}, []);

	return (
		<div className='App'>
			{
				user
				? <DataLoader user={user} />
				: <Homepage />
			}
		</div>
	);
}

export default App;