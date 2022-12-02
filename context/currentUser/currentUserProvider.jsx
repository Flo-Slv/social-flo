'use client';

// import { createContext, useState } from 'react';
import { createContext } from 'react';

// const initialState = {
// 	name: 'Flo'
// };

// export const CurrentUserContext = createContext(initialState);
export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
	const currentUser = children.props.currentUser;
	return (
		<CurrentUserContext.Provider value={{ currentUser }}>
			{children}
		</CurrentUserContext.Provider>
	);
};
