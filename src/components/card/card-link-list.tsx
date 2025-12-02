import React from 'react';
import { CardListItem } from './card-list-item';

type CardListItemType = {
	id: string;
	label: string;
};

type CardListProps = {
	items?: CardListItemType[];
	additionalContent?: React.ReactNode;
	href?: string;
	children?: React.ReactNode;
};

export const CardLinkList = ({
	items,
	additionalContent,
	href,
	children
}: CardListProps) => (
	<>
		{additionalContent}
		{items?.length === 0 ? (
			<p className="text-gray-600">No items</p>
		) : (
			<>
				<ul>
					{items
						?.toSorted((a, b) => a.label.localeCompare(b.label))
						.map(item => (
							<CardListItem
								key={item.id}
								id={item.id}
								label={item.label}
								href={href ?? ''}
							/>
						))}
					{children}
				</ul>
			</>
		)}
	</>
);
