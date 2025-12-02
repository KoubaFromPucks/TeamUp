import React from 'react';

type CardProps = {
	children: React.ReactNode;
};

export const CardContent = ({
	children,
	className
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={`flex flex-col items-center lg:flex-row lg:justify-evenly ${className ?? ''}`}
	>
		{children}
	</div>
);

export const CardHeader = ({
	children,
	className
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={`mb-4 border-b pb-4 text-right ${className ?? ''}`}>
		{children}
	</div>
);

export const CardFooter = ({
	children,
	className
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={`mt-4 border-t pt-4 text-right ${className ?? ''}`}>
		{children}
	</div>
);

export const Card = ({ children }: CardProps) => (
	<div className="relative flex flex-col rounded-lg border p-4 shadow">
		{children}
	</div>
);
