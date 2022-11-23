import Link from 'next/link';

const Home = () => {
	return (
		<div className={'app'}>
			<Link href='/login'>Login</Link>
			<Link href='/yolo'>Create an account</Link>
		</div>
	);
};

export default Home;
