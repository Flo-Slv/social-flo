'use client';

import { useContext } from 'react';
import { CurrentUserContext } from '../context/current-user/current-user-provider.jsx';

const Home = () => {
	const { currentUser } = useContext(CurrentUserContext);
	console.log('homepage currentUser: ', currentUser);

	return (
		<div className={'homepage'}>
			Homepage
		</div>
	);
};

export default Home;
