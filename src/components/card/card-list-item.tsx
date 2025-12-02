import React from 'react';
import { StandardLink } from '../standard-link';

type CardListItemProps = {
	id: string;
	label: string;
	href: string;
};

export const CardListItem = ({ id, label, href }: CardListItemProps) => (
	<li key={id} className="w-full text-black">
		<StandardLink href={`${href}/${id}`} className="mx-0 block w-full">
			{label}
		</StandardLink>
	</li>
);
