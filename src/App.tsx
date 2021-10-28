import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import './App.scss';

import Homepage from './components/homepage/homepage.component';
import Nav from './components/nav/nav.component';
import UserPage from './components/user-page/user-page.component';

interface User {
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

		return unsubscribeFromAuth();
	}, [auth]);

	return (
		<div className="App">
			{
				user
				?
					<>
						<Nav />
						<UserPage />
					</>
				: <Homepage />
			}
		</div>
	);
}

export default App;