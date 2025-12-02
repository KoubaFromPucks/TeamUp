'use client';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const Loading = () => (
	<h1 className="flex flex-row text-3xl font-semibold text-gray-800">
		Loading user profile
		<LoaderCircle className="ml-2 h-8 w-8 animate-spin" />
	</h1>
);

export default Loading;
