'use client';
import { LoaderCircle } from 'lucide-react';

const Loading = () => (
	<h1 className="text-3xl font-semibold text-gray-800">
		Loading user profile
		<LoaderCircle className="animate-spin text-blue-500 w-8 h-8 ml-2" />
	</h1>
);

export default Loading;
