import React from 'react';

type CardLabeledItemProps = {
	label: string;
	children: React.ReactNode;
};

export const CardLabeledItem = ({ label, children }: CardLabeledItemProps) => (
	<div className="mt-4 text-center">
		<h2 className="mb-2 text-xl font-bold">{label}</h2>
		<hr className="mb-2 border-black" />
		{children}
	</div>
);
