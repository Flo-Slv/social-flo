'use client';

import { useContext } from 'react';
import { CurrentUserContext } from '../../../context/current-user/current-user-provider.jsx';

import '../../../styles/backend/profile.scss';

const Profile = () => {
	const { currentUser } = useContext(CurrentUserContext);
	console.log('profile currentUser: ', currentUser);

	return (
		<div className={'test'}>
			<div>
				Name: {currentUser.name || 'no name yet...'} 
			</div>

			<div>
				Email: {currentUser.email}
			</div>
		</div>
	);
};

export default Profile;
