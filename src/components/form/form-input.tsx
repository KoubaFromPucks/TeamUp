import { useFormContext } from 'react-hook-form';
import React from 'react';

import {
	BasicInput,
	type BasicInputProps
} from '@/components/basic-components/basic-input';
import { cn } from '@/lib/cn';

type FormInputProps = BasicInputProps & {
	label: string;
	name: string;
};

export const FormInput = ({ name, label, ...inputProps }: FormInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<label htmlFor={name}>
			<div>{label}</div>

			<BasicInput
				{...inputProps}
				{...register(name, {
					valueAsNumber: inputProps.type === 'number'
				})}
				id={name}
				className={cn(errors[name] && 'border-red-600', inputProps.className)}
			/>

			{errors[name] && (
				<span className="mt-1 text-sm text-red-600">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</label>
	);
};
