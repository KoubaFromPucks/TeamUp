import { forwardRef } from 'react';
import React from 'react';

import { cn } from '@/lib/cn';

export type BasicInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	type?: string;
	className?: string;
};

const BasicInput = forwardRef<HTMLInputElement, BasicInputProps>(
	({ className, type, ...props }, ref) => (
		<input
			type={type}
			className={cn(
				'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
BasicInput.displayName = 'BasicInput';

export { BasicInput };
