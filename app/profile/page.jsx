'use client';

import { useContext } from 'react';
import { CurrentUserContext } from '../../context/currentUser/currentUserProvider.jsx';

import '../../styles/profile.scss';

const Profile = () => {
	const { currentUser } = useContext(CurrentUserContext);

	console.log({currentUser});
	return (
		<div>
			<div>
				Name:
			</div>
		</div>
	);
};

export default Profile;
