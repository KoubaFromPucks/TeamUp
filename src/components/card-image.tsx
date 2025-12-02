import React from 'react';

const sizeVariants = ['small', 'medium', 'large'] as const;

const sizeClasses: Record<typeof sizeVariants[number], string> = {
	small: 'h-20 w-20',
	medium: 'h-40 w-40',
	large: 'h-80 w-80'
};

type CardImageProps = {
	imageUrl?: string;
	size?: typeof sizeVariants[number];
};

export const CardImage = ({ imageUrl, size = 'large' }: CardImageProps) => (
	<img
		src={imageUrl}
		alt="User image"
		className={`mb-4 rounded-full object-cover ${sizeClasses[size]}`}
	/>
);
