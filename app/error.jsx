'use client';

// const Error = ({ error, reset }) => {
export default function Error({ error, reset }) {
	console.log('error client: ', error);

	return (
		<div>
			<p>Something went wrong !</p>
			<button onClick={() => reset()}>Reset error boundary</button>
		</div>
	);
};

// export default Error;
