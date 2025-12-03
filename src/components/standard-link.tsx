import Link, { type LinkProps } from 'next/link.js';
import React from 'react';
import { cn } from '@/lib/cn';

type variants = 'dark' | 'light';

const variantStyles: Record<variants, string> = {
	dark: 'bg-primary text-primary-foreground hover:bg-primary/90',
	light: 'bg-white text-black hover:bg-gray-200'
};

type StandardLinkProps = LinkProps & {
	className?: string;
	href: string;
	children: React.ReactNode;
	variant?: variants;
};

export const StandardLink = ({
	className,
	href,
	children,
	variant = 'light'
}: StandardLinkProps) => (
	<Link
		className={cn(
			'm-1 rounded-lg border border-black p-1',
			variantStyles[variant],
			className
		)}
		href={href}
	>
		{children}
	</Link>
);
