import { cookies } from 'next/headers';

import verifyJwt from '../utils/jose/verifyJwt.js';

import { ThemeProvider } from '../context/theme/theme-provider.jsx';

import Navbar from '../components/navbar/Navbar.jsx';

import '/styles/global.scss';

const RootLayout = async ({ children }) => {
	const cookiesList = cookies();
	const hasCurrentUser = cookiesList.has('currentUser');
	let currentUser = {};

	if (hasCurrentUser) {
		const jwt = cookiesList.get('currentUser').value;
		currentUser = await verifyJwt(jwt, 'layout');
	}

	return (
		<html lang='en'>
			<head />

			<body>
				<ThemeProvider>
					<Navbar currentUser={currentUser} />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
