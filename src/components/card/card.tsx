import React from 'react';

type CardProps = {
	children: React.ReactNode;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col items-center lg:flex-row lg:justify-evenly">
		{children}
	</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
	<div className="mb-4 border-b pb-4 text-right">{children}</div>
);

export const CardFooter = ({ children }: { children: React.ReactNode }) => (
	<div className="mt-4 border-t pt-4 text-right">{children}</div>
);

export const Card = ({ children }: CardProps) => (
	<div className="relative flex flex-col rounded-lg border p-4 shadow">
		{children}
	</div>
);
