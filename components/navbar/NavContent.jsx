'use client';

import { useRouter } from 'next/navigation';

import '../../styles/navbar.scss';

const NavContent = ({ currentUser }) => {
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

	return (
		<nav className={'navbar'}>
			<ul>
				<li>Profile</li>
				<li onClick={() => handleLogout()}>Logout</li>
			</ul>
		</nav>
	);
};

export default NavContent;
