'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import '../../styles/navbar.scss';

const NavContent = ({ currentUser }) => {
	const [isActive, setIsActive] = useState(Boolean(false));

	const router = useRouter();

	const handleLogout = () => {
		fetch('/api/users/logout', {
			headers: { 'Content-Type': 'application/json'},
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					console.log('logout error: ', res.error)
					return null;
				}

				// Redirect to homepage if ok.
				router.refresh('/login');
		});
	};

	const toggleActive = () => setIsActive(isActive => !isActive);

	return (
		<div
			className={`${isActive ? 'nav-container-active' : ''} nav-container`}
		>
			<a
				href='#'
				className={`${isActive ? 'nav-active' : ''} nav-toggle`}
				onClick={() => toggleActive()}
			>
				<span className={'nav-icon'}></span>
			</a>

			<ul className={`${isActive ? 'nav-content-active' : ''} nav-content`}>
				<li>
					Profile
				</li>

				<li onClick={() => handleLogout()}>
					Logout
				</li>
			</ul>
		</div>
	);
};

export default NavContent;
