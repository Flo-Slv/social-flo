'use client';

import NavContent from './NavContent.jsx';

const Navbar = ({ currentUser }) => {
	return (
		<>
			{Object.keys(currentUser).length !== 0 ? (
				<NavContent currentUser={currentUser} />
			) : null}
		</>
	);
};

export default Navbar;
