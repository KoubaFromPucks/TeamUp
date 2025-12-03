import { GithubLoginButton } from '@/components/login/githubLoginButton';
import React from 'react';

const Home = () => (
	<>
		<h1 className="text-3xl">Teamup</h1>

		<div className="mt-10">Page Content</div>

		<GithubLoginButton/>
	</>
);

export default Home;
