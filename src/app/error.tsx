'use client';

import React from 'react';
import { Button } from '@/components/basic-components/button';
import { StandardLink } from '@/components/standard-link';

export default function ElegantErrorPage({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	console.error('Error boundary caught an error:', error);

	return (
		<div className="flex min-h-[70vh] items-center justify-center">
			<div className="w-full max-w-xl rounded-xl border-t-8 border-red-600 bg-white p-10 shadow-2xl">
				<div className="text-center">
					<div className="mb-4 text-6xl" role="img" aria-label="stop sign">
						🛑
					</div>
					<h1 className="mb-2 text-3xl font-extrabold text-red-700">
						Something went wrong
					</h1>
					<p className="mb-6 text-gray-700">
						{error.message || 'Unexpected error occurred.'}
					</p>
				</div>

				<div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
					<Button onClick={() => reset()}>Reload Page</Button>

					<StandardLink href="/">Home Page</StandardLink>
				</div>
			</div>
		</div>
	);
}
