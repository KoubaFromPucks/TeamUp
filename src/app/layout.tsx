import './globals.css';
import React from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';

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
		<body className={`flex min-h-screen flex-col ${poppins.className}`}>
			<main className="mx-auto, container py-8">
				<Providers>{children}</Providers>
				<Toaster richColors position="bottom-right" />
			</main>
		</body>
	</html>
);

export default RootLayout;
