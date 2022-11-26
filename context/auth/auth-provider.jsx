'use client';

import { createContext } from 'react';

// const initialState = {
//
// };

// export const AuthContext = createContext(initialState);
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	return (
		<AuthContext>
			{children}
		</AuthContext>
	);
};
