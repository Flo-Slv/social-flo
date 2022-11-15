'use client';

import { useContext } from 'react';
import Image from 'next/image';

import { ThemeContext } from '../theme-provider';

import './login.scss';
import lightTheme from '../../public/light-theme.png';
import darkTheme from '../../public/dark-theme.png';

const Login = () => {
	const { dark, toggle } = useContext(ThemeContext);

	return (
		<div className={`login ${dark ? 'dark-mode' : 'light-mode'}`}>
			<h1>Social Flo</h1>

			<form>
				<input
					type='email'
					name='email'
					placeholder='Email'
					required
				/>

				<input
					type='password'
					name='password'
					placeholder='Password'
					minLength='10'
					required
				/>
				<button>Log in</button>
			</form>

			<div className={'login-image'}>
				<Image
					src={`${dark ? lightTheme.src : darkTheme.src}`}
					alt={`${dark ? 'Dark' : 'Light'} theme icon`}
					onClick={() => toggle()}
					width={50}
					height={50}
				/>
			</div>
		</div>
	)
};

export default Login;
