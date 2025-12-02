import React from 'react';
import { StandardLink } from '../standard-link';

type CardProps = {
	children: React.ReactNode;
	showLinkFlag?: boolean;
	linkText?: string;
	linkHref?: string;
};

export const Card = ({
	children,
	showLinkFlag,
	linkText,
	linkHref
}: CardProps) => (
	<div className="relative flex flex-col items-center rounded-lg border p-4 shadow lg:flex-row lg:justify-evenly">
		{showLinkFlag && (
			<StandardLink className="absolute top-4 right-4" href={linkHref ?? ''}>
				{linkText}
			</StandardLink>
		)}
		{children}
	</div>
);
