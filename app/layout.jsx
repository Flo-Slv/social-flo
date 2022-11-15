import { ThemeProvider } from '../context/theme/theme-provider.jsx';

import './global.scss';

const RootLayout = ({ children }) => {
	return (
		<html lang='en'>
			<head />

			<body>
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
