'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

import { ThemeContext } from '../../context/theme/theme-provider.jsx';

import '../css/login.scss';

import lightTheme from '../../public/light-theme.png';
import darkTheme from '../../public/dark-theme.png';

const Login = () => {
	const { dark, toggle } = useContext(ThemeContext);

	const [error, setError] = useState('');

	const router = useRouter();

	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData(e.target);

		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		// Try to login.
		fetch('/api/users/login', {
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST'
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					setError(res.error);
					return null;
				}

				// Redirect to profile if ok.
				router.push('/');
			});
	};

	return (
		<div className={`login ${dark ? 'dark-mode' : 'light-mode'}`}>
			<h1>Social Flo</h1>

			<form onSubmit={handleSubmit} autoComplete={'off'}>
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

			{error && (
				<div>{error}</div>
			)}

			<div className={'login-buttons'}>
				<button onClick={() => router.push('/yolo')}>
					Create an account
				</button>

				<button onClick={() => router.push('/')}>
					Back to home
				</button>
			</div>

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
