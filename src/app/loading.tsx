import React from 'react';

const Loading = () => (
	<div className="flex min-h-[70vh] items-center justify-center bg-white">
		<div className="flex space-x-2">
			<div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
			<div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
			<div className="bg-primary h-4 w-4 animate-bounce rounded-full"></div>
		</div>
	</div>
);

export default Loading;
