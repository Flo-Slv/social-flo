import './global.scss';

const RootLayout = ({ children }) => {
	return (
		<html lang='en'>
			<head>
				<meta
					name='description'
					content='Social Flo'
				/>

				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>

				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Lobster'
				/>

				<link
					rel='stylesheet'
					href='https://fonts.cdnfonts.com/css/gotham-rounded'
				/>

				<link rel='icon' href='/favicon.ico' />

				<title>Social Flo</title>
			</head>

			<body>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
