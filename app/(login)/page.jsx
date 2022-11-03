import './login.scss';

const Login = () => {
	return (
		<div className={'login'}>
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
		</div>
	)
};

export default Login;
