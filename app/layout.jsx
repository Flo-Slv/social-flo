import { ThemeProvider } from '../context/theme/theme-provider.jsx';
import { AuthProvider } from '../context/theme/auth-provider.jsx';

import '/styles/global.scss';

const RootLayout = ({ children }) => {
	return (
		<html lang='en'>
			<head />

			<body>
				<AuthProvider>
					<ThemeProvider>
						{children}
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
