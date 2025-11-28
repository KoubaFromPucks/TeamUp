import './globals.css';
import React from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Providers } from '@/components/providers';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
	title: 'TeamUp'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body
			className={`flex min-h-screen flex-col bg-gray-200 ${poppins.className}`}
		>
			<main className="container py-10">
				<Providers>{children}</Providers>
			</main>
		</body>
	</html>
);

export default RootLayout;
