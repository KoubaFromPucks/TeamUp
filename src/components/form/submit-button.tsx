import { Loader } from 'lucide-react';

import { Button } from '../basic-components/button';

import React from 'react';

export const SubmitButton = ({
	isLoading = false,
	text,
	variant
}: {
	isLoading?: boolean;
	text?: string;
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link';
}) => (
	<Button type="submit" disabled={isLoading} variant={variant ?? 'default'}>
		{isLoading && <Loader className="animate-spin" />}
		<span>{text ?? 'Submit'}</span>
	</Button>
);
