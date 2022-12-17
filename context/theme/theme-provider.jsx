'use client';

import { createContext, useState } from 'react';

const initialState = {
	dark: Boolean(true),
	toggle: () => {}
};

export const ThemeContext = createContext(initialState);

export const ThemeProvider = ({ children }) => {
	const [dark, setDark] = useState(Boolean(true));

	const toggle = () => setDark(!dark);

	return (
		<ThemeContext.Provider value={{ dark, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
};
