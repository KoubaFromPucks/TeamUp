import { useFormContext } from 'react-hook-form';
import React from 'react';

import {
	BasicSelect,
	type BasicSelectProps
} from '@/components/basic-components/basic-select';
import { cn } from '@/lib/cn';

type FormSelectProps = BasicSelectProps & {
	label: string;
	name: string;
	children?: React.ReactNode;
};

export const FormSelect = ({
	name,
	label,
	...selectProps
}: FormSelectProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<label htmlFor={name}>
			<div>{label}</div>

			<BasicSelect
				{...selectProps}
				{...register(name)}
				id={name}
				className={cn(errors[name] && 'border-red-600', selectProps.className)}
			>
				{selectProps.children}
			</BasicSelect>

			{errors[name] && (
				<span className="mt-1 text-sm text-red-600">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</label>
	);
};
