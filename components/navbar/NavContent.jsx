'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

import '../../styles/navbar.scss';

const NavContent = () => {
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
			className={`nav-container${isActive ? ' nav-container-active' : ''}`}
		>
			<button
				className={`nav-toggle${isActive ? ' nav-active' : ''}`}
				onClick={() => toggleActive()}
			>
				<span className={'nav-icon'}></span>
			</button>

			<ul className={`nav-content${isActive ? ' nav-content-active' : ''}`}>
				<li>
					<Link href='/'>
						<i className='fa fa-home' style={{ '--i': 1}}></i>
						<span style={{ '--g': 1 }}>Homepage</span>
					</Link>
				</li>

				<li>
					<Link href='/profile'>
						<i className='fa fa-user' style={{ '--i': 2}}></i>
						<span style={{ '--g': 2 }}>Profile</span>
					</Link>
				</li>

				<li onClick={() => handleLogout()}>
					<a>
						<i
							className='fa-solid fa-right-from-bracket'
							style={{ '--i': 3 }}
							>
						</i>
						<span style={{ '--g': 3 }}>Logout</span>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default NavContent;
