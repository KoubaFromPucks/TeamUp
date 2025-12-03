import { forwardRef } from 'react';
import React from 'react';

import { cn } from '@/lib/cn';

export type BasicSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
	className?: string;
	children?: React.ReactNode;
};

const BasicSelect = forwardRef<HTMLSelectElement, BasicSelectProps>(
	({ className, ...props }, ref) => (
		<select
			className={cn(
				'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		>
			{props.children}
		</select>
	)
);
BasicSelect.displayName = 'BasicSelect';

export { BasicSelect };
