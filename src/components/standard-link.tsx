import Link, { type LinkProps } from 'next/link.js';
import React from 'react';
import { cn } from '@/lib/cn';

type StandardLinkProps = LinkProps & {
	className?: string;
	href: string;
	children: React.ReactNode;
};

export const StandardLink = ({
	className,
	href,
	children
}: StandardLinkProps) => (
	<Link
		className={cn(
			'm-1 rounded-lg border border-black p-1 text-black hover:bg-gray-200',
			className
		)}
		href={href}
	>
		{children}
	</Link>
);
