'use client';

import { useContext } from 'react';
import Image from 'next/image';

import { ThemeContext } from '../../context/theme/theme-provider.jsx';

import './login.scss';
import lightTheme from '../../public/light-theme.png';
import darkTheme from '../../public/dark-theme.png';

const Login = () => {
	const { dark, toggle } = useContext(ThemeContext);

	const handleSubmit = async e => {
		e.preventDefault();

		const formData = new FormData(e.target);

		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		const res = await fetch('/api/users', {
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST'
		});

		const user = await res.json();

		console.log('user: ', user);
	};

	return (
		<div className={`login ${dark ? 'dark-mode' : 'light-mode'}`}>
			<h1>Social Flo</h1>

			<form onSubmit={handleSubmit}>
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

				<button type='submit'>Log in</button>
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
