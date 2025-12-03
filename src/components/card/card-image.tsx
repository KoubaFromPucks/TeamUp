import React from 'react';

type SizeVariant = 'small' | 'medium' | 'large';

const sizeClasses: Record<SizeVariant, string> = {
	small: 'h-10 w-10',
	medium: 'h-40 w-40',
	large: 'h-80 w-80'
};

type CardImageProps = {
	imageUrl?: string;
	size?: SizeVariant;
	className?: string;
};

export const CardImage = ({
	imageUrl,
	size = 'large',
	className = ''
}: CardImageProps) => (
	<img
		src={imageUrl ?? undefined}
		alt="User image"
		className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
	/>
);
